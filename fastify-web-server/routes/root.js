"use strict";

module.exports = async (app, opts) => {
  app.get("/", async (_req, res) => {
    return res.view("index.hbs");
  });
};
