const express = require("express");
const router = express.Router();
const authenticationController = require("../controller/authentication.controller");

router.get("/", async (req, res) => {
  await authenticationController.loginUser().then((data) => res.json(data));
});

router.post("/", (req, res) => {
  console.log(req.body);
  authenticationController.createUser(req.body).then((data) => res.json(data));
});

module.exports = router;
