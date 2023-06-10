const express = require('express');
const router = express.Router();
const sceneController = require('../controller/scene.controller');
const authService = require('../service/auth.service');
const uploadMiddleware = require('../middleware/upload');
const upload = uploadMiddleware.upload

router.get("/:id", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let scene = await sceneController.getScene(req.params.id);
    if (Number.isInteger(scene)) { return res.sendStatus(scene); }
    res.json(scene);
});

router.get("/:id/:value", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let scene = await sceneController.getSceneValue(req.params.id, req.params.value).then((data) => res.json(data));
    //! error Handling missing since the return from db can be a int!!
});

router.put("/:id/image", upload.single('image'), async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let scene = await sceneController.uploadImage(req.params.id, req.file.filename);
    if (Number.isInteger(scene)) { return res.sendStatus(scene); }
    res.json(scene);
});

module.exports = router;