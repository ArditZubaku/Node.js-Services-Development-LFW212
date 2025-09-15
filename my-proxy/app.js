"use strict";

const proxy = require("@fastify/http-proxy");
const sensible = require("@fastify/sensible");

module.exports = async function (app, opts) {
  app.register(sensible);
  app.register(proxy, {
    upstream: "https://news.ycombinator.com/",
    async preHandler(req, res) {
      if (req.query.token !== "abc") {
        throw app.httpErrors.unauthorized();
      }
    },
  });
};
