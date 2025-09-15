"use strict";

const sensible = require("@fastify/sensible");
const proxy = require("@fastify/http-proxy");

module.exports = function (app, opts) {
  app.register(sensible);

  app.register(proxy, {
    upstream: "https://jsonplaceholder.typicode.com",
  });
};
