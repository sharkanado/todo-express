require("dotenv/config");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const PORT = process.env.PORT || 3000;

var todosRouter = require("./routes/todos");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/todos", todosRouter);
app.use("/users", usersRouter);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, the app is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

module.exports = app;
