"use strict";

const express = require("express");
const createError = require("http-errors");
const indexRoutes = require("./routes");
const helloRoutes = require("./routes/hello");

const app = express();

app.use("/", indexRoutes);
app.use("/hello", helloRoutes);

app.use((req, _res, next) => {
  if (req.method !== "GET") {
    next(createError(405));
    return;
  }
  next(createError(404));
});

// This registered middleware specifies four parameters instead of the usual three.
// This makes Express recognize the middleware as the final error handling middleware
// and passes the error object that we pass to next in the prior middleware
// as the first argument of this special error-handling middleware function
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
