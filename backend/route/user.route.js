
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/", async (req, res) => {
    if  (req.session.user){
        await userController.getUser(req.session.user.username).then((data) => res.json(data));
    }else{res.sendStatus(401);}
});

router.post("/changeType", async(req, res) => {
    if (req.session.user){
        let data = await userController.changeType(req.session.user.username,req.body);
        if(data === 400){
            res.sendStatus(400);
        }else{
            res.json(data);
        }
    }else{res.sendStatus(401);}
})

router.post("/create", async(req, res) => {
    let data = await userController.createUser(req.body);
    if(data === 400){
        res.sendStatus(400);
    }else{
        res.json(data);
    }
})

router.post("/delete", async(req, res) => {
    
})

module.exports = router;