"use strict";

module.exports = async function (app, _opts) {
  app.get("/me", async function (_req, res) {
    return res.view("hello.hbs", { greeting: "Hello" });
  });
};
