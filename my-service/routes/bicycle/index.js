// "use strict";

// const { bicycle } = require("../../model");

// module.exports = async (app, opts) => {
//   app.get("/:id", (req, res) => {
//     const { id } = req.params;
//     bicycle.read(id, (err, result) => {
//       if (err) {
//         if (err.message === "not found") {
//           res.notFound();
//         } else {
//           // If the error is something else, this is assumed to be a server error,
//           // and the err object is passed to reply.send.
//           //  This causes Fastify to generate a 500 response and output the error message.
//           res.send(err);
//         }
//       } else {
//         res.send(result);
//       }
//     });
//   });
// };

// Callback API inside an async rout handler
// "use strict";

// const { bicycle } = require("../../model");

// module.exports = async (fastify, opts) => {
//   fastify.get("/:id", async (request, reply) => {
//     const { id } = request.params;
//     bicycle.read(id, (err, result) => {
//       if (err) {
//         if (err.message === "not found") reply.notFound();
//         else reply.send(err);
//       } else reply.send(result);
//     });
//     await reply;
//   });
// };

// Using promisify
"use strict";
const { promisify } = require("node:util");
const { bicycle } = require("../../model");
const read = promisify(bicycle.read);

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors;

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      return await read(id);
    } catch (err) {
      if (err.message === "not found") throw notFound();
      throw err;
    }
  });
};
