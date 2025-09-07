"use strict";

const hnLatestStream = require("hn-latest-stream");

module.exports = async (app, opts) => {
  app.get("/", async (req, res) => {
    const { amount = 10, type = "html" } = req.query;

    if (type === "html") res.type("text/html");
    if (type === "json") res.type("application/json");

    return hnLatestStream(amount, type);
  });
};
