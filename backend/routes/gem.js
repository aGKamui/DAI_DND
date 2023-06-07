const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  res.status(200).send("You've found the 💎!");
});

module.exports = router;
