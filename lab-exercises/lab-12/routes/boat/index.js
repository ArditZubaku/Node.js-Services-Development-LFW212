"use strict";
const { promisify } = require("util");
const { boat } = require("../../model");
const { uid } = boat;
const read = promisify(boat.read);
const create = promisify(boat.create);
const del = promisify(boat.del);

module.exports = async (app, opts) => {
  const { notFound } = app.httpErrors;

  const bodySchema = {
    type: "object",
    required: ["data"],
    additionalProperties: false,
    properties: {
      data: {
        type: "object",
        required: ["brand", "color"],
        additionalProperties: false,
        properties: {
          brand: {
            type: "string",
          },
          color: {
            type: "string",
          },
        },
      },
    },
  };

  app.post(
    "/",
    {
      schema: {
        body: bodySchema,
      },
    },
    async (req, res) => {
      const { data } = req.body;
      const id = uid();
      await create(id, data);
      res.code(201);
      return { id };
    }
  );

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
