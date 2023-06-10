const express = require("express");
const router = express.Router();
const purchaseController = require("../controller/purchase.controller");
const authService = require('../service/auth.service');

router.post("/create", async (req, res) => {
    AuthedUser = await authService.verifyToken(req.headers.auth);
    if(AuthedUser === 401){
        return res.status(401).send("Invalid Token.");
    }
    const { type , date, value } = req.body
    if(!type || !date || !value) {
        return res.status(400).send("Must provide a type, date and value.");
    }
    let purchase = await purchaseController.createPurchase(req.body, AuthedUser.username);
    if(purchase === 400){
        return res.status(400).send("Invalid information provided.")
    }
    return res.status(200).json(purchase)
})

module.exports = router;