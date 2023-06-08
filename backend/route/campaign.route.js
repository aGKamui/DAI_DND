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

module.exports = router;