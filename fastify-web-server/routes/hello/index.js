"use strict";

module.exports = async (app, opts) => {
  app.get("/", async (req, res) => {
    return res.sendFile("hello.html");
  });
};
