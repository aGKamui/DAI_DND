const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authService = require('../service/auth.service');

router.get("/", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    await userController.getUser(AuthedUser.username).then((data) => res.status(200).json(data));
    });

router.put("/changeType", async(req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let data = await userController.changeType(AuthedUser.username,req.body);
    if(data === 400){
        return res.status(400).send("Invalid Type.");
    }
    return res.status(200).json(data);
})

router.delete("/delete", async(req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let data = await userController.deleteUser(AuthedUser.username);
    res.status(204).json(data);
})

module.exports = router;