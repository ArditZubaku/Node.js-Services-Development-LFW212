"use strict";

module.exports = async function (app, opts) {
  app.get("/", async function (request, reply) {
    const { url } = request.query;
    try {
      new URL(url);
    } catch (err) {
      throw app.httpErrors.badRequest();
    }

    return reply.from(url);
  });
};
