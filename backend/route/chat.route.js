const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat.controller');
const authService = require('../service/auth.service');



router.get("/:id", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let chat = await chatController.getChat(req.params.id);
    if (Number.isInteger(chat)) { return res.sendStatus(chat); }
    res.json(chat);
});

router.put("/:id", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    await chatController.addMessage(AuthedUser.username, req.body.message, req.params.id).then((data) => res.json(data));
});


module.exports = router;