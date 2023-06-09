const express = require("express");
const router = express.Router();
const campaignController = require("../controller/campaign.controller");
const authService = require('../service/auth.service');

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
    if(campaign === 401){
        return res.status(401).send("Invalid Campaign.");
    }
    return res.status(200).json(campaign);
})

module.exports = router;