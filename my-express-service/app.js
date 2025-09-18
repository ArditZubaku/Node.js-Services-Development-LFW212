var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var bicycleRouter = require("./routes/bicycle");

var app = express();

app.use(logger("dev"));
// Registering the IP blocking middleware as early as possible makes sense
// since we don't want an attacker to be able to access any systems.
// However, it can also be argued that we want to register it after logging middleware.
// Either way the IP is blocked, but in the latter case the act of it being blocked is visible in the logs.
app.use(function (req, res, next) {
  console.log({ addr: req.socket.remoteAddress });
  if (req.socket.remoteAddress === "127.0.0.1") {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err);
    return;
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/bicycle", bicycleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.send({
    type: "error",
    status: err.status,
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : undefined,
  });
});

module.exports = app;
