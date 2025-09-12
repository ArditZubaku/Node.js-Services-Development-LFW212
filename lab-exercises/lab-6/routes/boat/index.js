const { promisify } = require("util");
const { boat } = require("../../model");
const { uid } = boat;
const create = promisify(boat.create);
const read = promisify(boat.read);

module.exports = (app, opts) => {
  app.post("/", async (req, res) => {
    const { data } = req.body;
    if (data) {
      // try {
      const id = uid();
      await create(id, data);
      res.code(201);
      // TODO: Try it without the catch block as well to see if Fastify catches unexp errors
      // IT DOES!
      // } catch (err) {
      //   return app.httpErrors.internalServerError();
      // }
      return { id };
    } else {
      return app.httpErrors.badRequest();
    }
  });

  app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const res = await read(id);
      return res;
    } catch (err) {
      if (err.code === "E_NOT_FOUND") {
        return app.httpErrors.notFound();
      }
      return app.httpErrors.internalServerError();
    }
  });
};
