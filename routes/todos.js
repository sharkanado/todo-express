const express = require("express");
const router = express.Router();

const todos = [];
const length = todos.length;
//TODO: validation of req body - no idea how to with no use of any middleware

/* GET todos listing. */
router.get("/", function (req, res, next) {
  res.send(todos);
  res.status(200).json();
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
