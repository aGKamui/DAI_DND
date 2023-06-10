const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");
const router = express.Router();
require("dotenv").config();

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { username, password } = req.body;
    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ "username": username });
    if (user && bcrypt.compare(password + process.env.PASSWORD_SECRET, user.password)) {
      // Create token
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      res.status(200).json(user);          
    }else{
      res.status(400).send("Invalid Credentials");   
    }
    
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
});

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!email || !password || !username){
      return res.status(400).send("All input is required");
    };

    // Check if user already exist
    // Validate if user with the same email exists in our database
    let usedEmail = await User.findOne({ email });
    
    // Validate if user with the same username exists in our database
    let usedUsername = await User.findOne({ username});

    if (usedEmail || usedUsername) {
      return res.status(409).send("User Already Exist. Please Login");
    }
  
    // Encrypt user password
    encryptedPassword = await bcrypt.hash(password + process.env.PASSWORD_SECRET, 10);

    // Create user in our database
    const user = await User.create({
      username: username,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      type: "Free",
      campaigns: [],
      characters: []
    });

    // Create token
    const token = jwt.sign(
      {username: user.username},
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );
    
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(201).json({ message: err.message });
}});

module.exports = router;
