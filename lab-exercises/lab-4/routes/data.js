"use strict";

const stream = require("../stream");

module.exports = async function (app, opts) {
  app.get("/data", async function (req, res) {
    res.type("text/html");
    return stream();
  });
};
