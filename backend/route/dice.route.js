const express = require("express");
const router = express.Router();
const diceController = require("../controller/dice.controller");
const authService = require('../service/auth.service');

router.post("/roll/", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let {dicetype, modifiers} = req.body;
    if(!dicetype || !modifiers){
        return res.sendStatus(400).send("Must Provide dicetype and modifiers!");
    }
    await diceController.roll(req.body).then((data) => res.json(data));
  });

router.post("/save/", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    let {dicetype, modifiers} = req.body;
    if(!dicetype || !modifiers || !diceresult){
        return res.sendStatus(400).send("Must Provide dicetype, modifiers and result of the roll");
    }
    await diceController.roll(req.body).then((data) => res.json(data));
  });

  module.exports = router;