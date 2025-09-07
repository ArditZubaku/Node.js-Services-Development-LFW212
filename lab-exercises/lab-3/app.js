"use strict";

const path = require("node:path");
const AutoLoad = require("@fastify/autoload");

const pointOfView = require("@fastify/view");
const handlebars = require("handlebars");

const options = {};

module.exports = async function (app, opts) {
  app.register(pointOfView, {
    engine: { handlebars },
    root: path.join(__dirname, "views"),
    layout: "layout.hbs",
  });

  app.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};

module.exports.options = options;
