require("dotenv/config");
var express = require("express");

const PORT = process.env.PORT || 3000;

var todosRouter = require("./src/routes/todos");
var usersRouter = require("./src/routes/users");

var app = express();

app.use(express.json());

app.use("/todos", todosRouter);
app.use("/users", usersRouter);

app.listen(PORT, (error) => {
  if (!error) console.log("App is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});

module.exports = app;
