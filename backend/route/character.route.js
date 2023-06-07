const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const characterController = require('../controller/character.controller');

const Validate = function(token) {  
    try {        
        return jwt.verify(token, process.env.JWT_SECRET_KEY)      
    } catch (error) {
        //SE ISTO ACONTECER EXPIROU O TOKEN OR USER WRONG?
    }    
  }
  

router.get("/", async (req, res) => {
    AuthedUser = Validate(req.headers.authorization);
    if (AuthedUser) {
        console.log("ENTREI CRL")

        let characters = await characterController.getCharacter(AuthedUser.username, req.params.id);
        if (Number.isInteger(characters)) { return res.sendStatus(characters); }
        res.json(characters);
    }
    else {         
        res.sendStatus(401); }
});

router.get("/:id", async (req, res) => {
    if (req.session.user) {
        console.log(req.params.id)
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

router.put("/:id", async (req, res) => {
    if (req.session.user) {
        await characterController.changeCharacter(req.session.user.username, req.body, req.params.id).then((data) => res.json(data));
    }
    else { res.sendStatus(401); }
});

module.exports = router;