const express = require("express");
const router = express.Router();
const campaignController = require("../controller/campaign.controller");
const authService = require('../service/auth.service');
const uploadMiddleware = require('../middleware/upload');
const upload = uploadMiddleware.upload

router.post("/create", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    const { title , system } = req.body
    if(!title || !system) {
        return res.status(400).send("Must provide a title and a system");
    }
    return await campaignController.createCampaign(req.body, AuthedUser.username).then((data) => res.status(200).json(data));
})

router.get("/:id", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    const campaign = await campaignController.getCampaign(req.params.id, AuthedUser.username);
    if(campaign === 404){
        return res.status(404).send("Campaign not found.");
    }
    if(campaign === 403){
        return res.status(403).send("You're not part of this campaign");
    }
    return res.status(200).json(campaign);
})

router.put("/:id", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    const campaign = await campaignController.updateCampaign(req.params.id, AuthedUser.username, req.body);
    if(campaign === 404){
        return res.status(404).send("Information not found.")
    }
    if(campaign === 403){
        return res.status(403).send("Not enough permissions.")
    }
    if(campaign === 400){
        return res.status(400).send("Invalid changes.")
    }
    return res.status(200).json(campaign);
})

router.get("/", async(req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    return res.status(200).json(await campaignController.getCampaigns(AuthedUser.username))
})

router.delete("/:id", async(req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    const campaign = await campaignController.deleteCampaign(req.params.id, AuthedUser.username);
    if(campaign === 404){
        return res.status(404).send("Campaign Not Found");
    }
    if(campaign === 403){
        return res.status(403).send("Not the owner of this campaign");
    }
    return res.status(200).json(campaign);
})

router.put("/:id/image", upload.single('image'), async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let campaign = await campaignController.uploadImage(req.params.id, req.file.filename);
    if (Number.isInteger(campaign)) { return res.sendStatus(campaign); }
    res.json(campaign);
});

router.put("/:id/character", async(req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    const campaign = await campaignController.addCharacter(req.params.id, req.body, AuthedUser.username)
    if(campaign === 404){
        return res.status(404).send("Campaign not found.")
    }
    if(campaign === 403){
        return res.status(403).send("Not enough permissions.")
    }
    if(campaign === 400){
        return res.status(400).send("Invalid JSON.")
    }
    return res.status(200).json(campaign);
})

router.delete("/:id/character", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    const campaign = await campaignController.deleteCharacter(req.params.id, req.body, AuthedUser.username)
    if(campaign === 400){
        return res.status(400).send("Invalid JSON.")
    }
    if(campaign === 403){
        return res.status(403).send("Not enough permissions.")
    }
    if(campaign === 404){
        return res.status(404).send("Resource Not Found.")
    }
    return res.status(200).json(campaign)
})
module.exports = router;