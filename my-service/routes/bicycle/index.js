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

  const idSchema = { type: "integer" };
  const paramsSchema = {
    type: "object",
    properties: {
      id: idSchema,
    },
  };

  const dataSchema = {
    type: "object",
    required: ["brand", "color"],
    additionalProperties: false,
    properties: {
      brand: { type: "string" },
      color: { type: "string" },
    },
  };
  const bodySchema = {
    // the schema is applied (conceptually) to the body after it has been parsed into a JavaScript object.
    type: "object",
    required: ["data"],
    additionalProperties: false,
    properties: {
      data: dataSchema,
    },
  };

  const schema = {
    params: paramsSchema,
    body: bodySchema,
  };

  app.post(
    "/",
    {
      schema: {
        body: bodySchema,
        response: {
          201: {
            type: "object",
            properties: {
              id: idSchema,
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { data } = request.body;
      const id = uid();
      await create(id, data);
      reply.code(201);
      return { id };
    }
  );

  app.post("/:id/update", { schema }, async (req, res) => {
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

  app.put("/:id", { schema }, async (req, res) => {
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

  app.delete(
    "/:id",
    {
      schema: {
        params: paramsSchema,
      },
    },
    async (req, res) => {
      const { id } = req.params;
      try {
        await del(id);
        res.code(204);
      } catch (err) {
        if (err.message === "not found") throw notFound();
        throw err;
      }
    }
  );

  app.get(
    "/:id",
    {
      schema: {
        params: paramsSchema,
        response: { 200: dataSchema },
      },
    },
    async (req, res) => {
      const { id } = req.params;
      try {
        return await read(id);
      } catch (err) {
        if (err.message === "not found") throw notFound();
        throw err;
      }
    }
  );
};
