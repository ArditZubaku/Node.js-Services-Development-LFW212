"use strict";

const fp = require("fastify-plugin");
const replyFrom = require("@fastify/reply-from");

module.exports = fp(async function (app, opts) {
  app.register(replyFrom, { errorHandler: false });
});
