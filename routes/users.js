const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const users = [{ id: 1, login: "Anna", password: "secretKey" }];

router.post("/signIn", (req, res) => {
  let existingUser = users.find((user) => req.body.login === user.login);
  if (!existingUser) {
    res.status(400).json("User not found.");
  } else {
    if (req.body.password === existingUser.password) {
      const token = jwt.sign(
        { userId: existingUser.id, login: existingUser.login },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(200).json({ accessToken: token });
    } else {
      res.status(400).json("Invalid password.");
    }
  }
});

router.post("/signUp", (req, res) => {
  let existingUser = users.find((user) => req.body.login === user.login);
  if (existingUser) {
    res.status(400).json("User already registered.");
  } else {
    const newUser = {
      id: users.length + 1,
      login: req.body.login,
      password: req.body.password,
    };
    users.push(newUser);
    res.status(201).json();
  }
});

module.exports = router;
