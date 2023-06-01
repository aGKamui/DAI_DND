const express = require('express');
const router = express.Router();
const characterController = require('../controller/character.controller');

router.get("/", async (req, res) => {
    if (req.session.user) {
        let characters = await characterController.getCharacter(req.session.user.username, req.params.id);
        if (Number.isInteger(characters)) { return res.sendStatus(characters); }
        res.json(characters);
    }
    else { res.sendStatus(401); }
});

router.get("/:id", async (req, res) => {
    if (req.session.user) {
        let characters = await characterController.getCharacter(req.session.user.username, req.params.id);
        if (Number.isInteger(characters)) { return res.sendStatus(characters); }
        res.json(characters);
    }
    else { res.sendStatus(401); }
});

router.post("/", async (req, res) => {
    if (req.session.user) {
        await characterController.createCharacter(req.session.user.username, req.body).then((data) => res.json(data));
    }
    else { res.sendStatus(401); }
});

module.exports = router;