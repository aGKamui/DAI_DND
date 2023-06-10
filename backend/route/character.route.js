const express = require('express');
const router = express.Router();
const characterController = require('../controller/character.controller');
const authService = require('../service/auth.service');

router.get("/", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let characters = await characterController.getCharacter(AuthedUser.username);
    if (Number.isInteger(characters)) { return res.sendStatus(characters); }
    res.json(characters);
});

router.get("/:id", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let character = await characterController.getCharacter(AuthedUser.username, req.params.id);
    if (Number.isInteger(character)) { return res.sendStatus(character); }
    res.json(character);
});

router.get("/:id/:value", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let character = await characterController.getCharacterValue(AuthedUser.username, req.params.id, req.params.value);
    if (Number.isInteger(character)) { return res.sendStatus(character); }
    res.json(character);
});

router.delete("/:id", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let characters = await characterController.delCharacter(AuthedUser.username, req.params.id);
    if (Number.isInteger(characters)) { return res.sendStatus(characters); }
    res.json(characters);
});


router.post("/", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    await characterController.createCharacter(AuthedUser.username, req.body).then((data) => res.json(data));
});

router.put("/:id", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    await characterController.changeCharacter(AuthedUser.username, req.body, req.params.id).then((data) => res.json(data));
});

module.exports = router;