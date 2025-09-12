const { promisify } = require("node:util");
const { boat } = require("../../model");
const { uid } = boat;
const create = promisify(boat.create);
const read = promisify(boat.read);
const del = promisify(boat.del);

module.exports = (app, opts) => {
  app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await del(id);
      res.code(204);
    } catch (err) {
      if (err.message === "not found") {
        return app.httpErrors.notFound();
      }
      return app.httpErrors.internalServerError();
    }
  });

  app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      return await read(id);
    } catch (err) {
      if (err.code === "E_NOT_FOUND") {
        return app.httpErrors.notFound();
      }
      // Never do return err, that might leak info, always use this safe general backfall
      return app.httpErrors.internalServerError();
    }
  });

  app.post("/", async (req, res) => {
    const { data } = req.body;
    if (data) {
      const id = uid();
      await create(id, data);
      res.code(201);
      return { id };
    } else {
      return app.httpErrors.badRequest();
    }
  });
};
