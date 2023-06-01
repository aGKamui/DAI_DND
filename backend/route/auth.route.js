const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

// router.get("/", async (req, res) => {
//   await authController.loginUser().then((data) => res.json(data));
// });

router.post("/register/", async (req, res) => {
  console.log(req.body);
  await authController.createUser(req.body).then((data) => res.json(data));
});

router.post("/login/", async (req, res) => {
  console.log(req.body);
  let auth = await authController.loginUser(req.body);
  if (auth === 401) { res.status(auth).sendStatus(401); }
  else{
    const { username, token } = auth;   
    req.session.user = {username, token};
    res.json(auth);
  }
});

//! this is to test session, delete later!!
router.get("/protect/", async (req, res) => {
  if (req.session.user) {
    let verifyToken = await authController.verifyUser(req.session.user.token)
    if (verifyToken === 401) { res.sendStatus(401); }
    else{ res.json({}) }
  }
  else { res.sendStatus(401); }
});

module.exports = router;
