const express = require("express");
const router = express.Router();

const todos = [];
const length = todos.length;

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("Error:", err);
    console.log("User:", user);
    if (err)
      return res.status(403).json({ success: false, message: "Invalid token" });
    req.user = user;
    next();
  });
};

router.get("/", authenticateToken, function (req, res, next) {
  res.status(200).json({
    success: true,
    data: {
      todos,
    },
  });
});

router.post("/", authenticateToken, (req, res) => {
  todos.push({ id: todos.length + 1, todo: req.body.todo, isDone: false });
  res.status(201).json();
});

router.patch("/:id", authenticateToken, (req, res) => {
  const { isDone, todo } = req.body;
  const id = req.params.id;
  const todoToUpdate = todos.find((todo) => todo.id === parseInt(id));
  todoToUpdate.isDone = isDone ? isDone : todoToUpdate.isDone;
  todoToUpdate.todo = todo ? todo : todoToUpdate.todo;
  res.status(200).json();
});

router.delete("/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const elementToDelete = todos.find((todo) => todo.id === parseInt(id));
  todos.splice(todos.indexOf(elementToDelete), 1);
  res.status(200).json();
});

module.exports = router;
