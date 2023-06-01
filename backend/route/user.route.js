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

router.delete("/delete", async(req, res) => {
    if(req.session.user){
        let data = await userController.deleteUser(req.session.user.username);
        res.json(data);
    }else{res.sendStatus(401);}
})

module.exports = router;