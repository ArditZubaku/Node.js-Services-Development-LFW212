const fp = require("fastify-plugin");

module.exports = fp((app, opts) => {
  // Only this had to be async
  app.addHook("onRequest", async (req) => {
    if (req.ip === "211.133.33.113") {
      throw app.httpErrors.forbidden();
    }
  });
});
