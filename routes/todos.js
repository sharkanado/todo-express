const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const todos = [];
const length = todos.length;
//TODO: validation of req body - no idea how to with no use of any middleware
//TODO: make it all a module?

//https://www.geeksforgeeks.org/how-to-implement-jwt-authentication-in-express-js-app/?ref=lbp
router.get("/", function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Error! Token was not provided.",
    });
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, "secretkeyappearshere");

  res.status(200).json({
    success: true,
    data: {
      todos,
    },
  });
});

router.post("/", (req, res) => {
  todos.push({ id: todos.length + 1, todo: req.body.todo, isDone: false });
  res.status(201).json();
});

router.patch("/:id", (req, res) => {
  const { isDone, todo } = req.body;
  const id = req.params.id;
  const todoToUpdate = todos.find((todo) => todo.id === parseInt(id));
  todoToUpdate.isDone = isDone ? isDone : todoToUpdate.isDone;
  todoToUpdate.todo = todo ? todo : todoToUpdate.todo;
  res.status(200).json();
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const elementToDelete = todos.find((todo) => todo.id === parseInt(id));
  todos.splice(todos.indexOf(elementToDelete), 1);
  res.status(200).json();
});

module.exports = router;
