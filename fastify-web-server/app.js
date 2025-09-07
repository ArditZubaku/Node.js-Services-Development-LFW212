"use strict";

const path = require("node:path");
const AutoLoad = require("@fastify/autoload");

const dev = process.env.NODE_ENV !== "production";

const fastifyStatic = dev && require("@fastify/static");

const options = {};

module.exports = async function (app, opts) {
  if (dev) {
    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });
  }

  app.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  app.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  app.setNotFoundHandler((req, res) => {
    if (req.method !== "GET") {
      res.status(405);
      return "Method Not Allowed\n";
    }
    return "Not Found\n";
  });
};

module.exports.options = options;
