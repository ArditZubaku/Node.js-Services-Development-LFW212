"use strict";

module.exports = async function (app, _opts) {
  app.get("/", async function (_req, _res) {
    return { root: true };
  });
};
