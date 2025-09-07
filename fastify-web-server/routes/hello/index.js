"use strict";

module.exports = async (app, opts) => {
  app.get("/", async (req, res) => {
    const { greeting = "Hello " } = req.query;
    return res.view(`hello.hbs`, { greeting });
  });
};
