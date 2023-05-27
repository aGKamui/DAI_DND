const express = require("express");
const router = express.Router();
const Person = require("../models/person");

router.get("/", async (req, res) => {
    try{
        const persons = await Person.find({});
        res.send(persons);
    } catch(err){
        res.statusCode = 400;
        res.send(err)
    }
});
router.get("/:id", async (req, res) => {
    try{
        const person = await Person.findById(req.params.id);
        res.send(person);
    } catch(err){
        res.statusCode = 400;
        res.send(err)
    }
});

router.post("/", async (req, res) => {
    try{
        const body = req.body;
        const person = await Person.create(body);
        res.send(person);
    } catch(err){
        res.statusCode = 400;
        res.send(err)
    }
});

function populate(number){
    for(let i = 0; i > number; i++) {
        Person.create({
            "firstName":"user"+i,
            "lastName":"lastName"+i,
            "age":Math.floor(Math.random())*120
        });
    };
}

router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;