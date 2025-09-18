"use strict";

const fp = require("fastify-plugin");

// A Fastify plugin is a function that either returns a promise or calls a callback
// and accepts the service instance (which we call fastify) and options (opts).
// module.exports = fp(async (app, opts) => {
//   app.addHook("onRequest", async (request) => {
//     if (request.ip === "127.0.0.1") {
//       const err = new Error("Forbidden");
//       err.status = 403;
//       throw err;
//     }
//   });
// });

module.exports = fp(async function (fastify, opts) {
  fastify.addHook("onRequest", async function (request) {
    if (request.ip === "127.0.0.1") {
      throw fastify.httpErrors.forbidden();
    }
  });
});
