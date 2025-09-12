"use strict";
const { promisify } = require("node:util");
const { boat } = require("../../model");
const read = promisify(boat.read);

module.exports = async (app, opts) => {
  app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      return await read(id);
    } catch (err) {
      if (err.code === "E_NOT_FOUND") {
        return app.httpErrors.notFound();
      }
      return app.httpErrors.internalServerError();
    }
  });
};
