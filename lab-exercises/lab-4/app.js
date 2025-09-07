"use strict";

const path = require("node:path");
const AutoLoad = require("@fastify/autoload");

const options = {};

module.exports = async function (app, opts) {
  app.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};

module.exports.options = options;
