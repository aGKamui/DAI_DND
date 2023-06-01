const express = require("express");
const router = express.Router();
const diceController = require("../controller/dice.controller");

router.post("/roll/", async (req, res) => {
    if(req.session.user){
        let {dicetype, modifiers} = req.body;
        console.log(req.body);
        if(!dicetype || !modifiers){
            res.sendStatus(400);
        }else{
            await diceController.roll(req.body).then((data) => res.json(data));
        }
    }else(res.sendStatus(401))
  });

router.post("/saveRoll/", async (req, res) => {
    if(req.session.user){
        let {dicetype, modifiers, diceresult, finalresult} = req.body;
        if(!dicetype || !modifiers || !diceresult){
            res.sendStatus(400);
        }else{
            if(!finalresult){
                req.body.finalresult = diceresult + modifiers;
            }
            await diceController.saveRoll(req.body).then((data) => res.json(data));
        }
    }else(res.sendStatus(401))
})

  module.exports = router;
