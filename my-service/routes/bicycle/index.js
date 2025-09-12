"use strict";
const { promisify } = require("util");
const { bicycle } = require("../../model");
const { uid } = bicycle;
const read = promisify(bicycle.read);
const create = promisify(bicycle.create);
const update = promisify(bicycle.update);
const del = promisify(bicycle.del);

module.exports = async (app, opts) => {
  const { notFound } = app.httpErrors;

  app.post("/", async (req, res) => {
    const { data } = req.body;
    const id = uid();
    await create(id, data);
    res.code(201);
    return { id };
  });

  app.post("/:id/update", async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await update(id, data);
      res.code(204);
    } catch (err) {
      if (err.message === "not found") throw notFound();
      throw err;
    }
  });

  app.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      await create(id, data);
      res.code(201);
      return {};
    } catch (err) {
      if (err.message === "resource exists") {
        await update(id, data);
        res.code(204);
      } else {
        throw err;
      }
    }
  });

  app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await del(id);
      res.code(204);
    } catch (err) {
      if (err.message === "not found") throw notFound();
      throw err;
    }
  });

  app.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      return await read(id);
    } catch (err) {
      if (err.message === "not found") throw notFound();
      throw err;
    }
  });
};
