Implement a RESTful JSON GET

Use either Fastify or Express to implement a RESTful HTTP server so that when the command `npm start` is executed, a server is started that listens on `process.env.PORT`.

If implementing in Fastify, remember that running `npm init fastify -- --integrate` in the labs-1 folder will set up the project `npm start` is executed the server will automatically listen on `process.env.PORT`.

The server should support a GET request to a single route: `/boat/{id}` where `{id}` is a placeholder for any given ID - for instance `/boat/2`.

The `GET /boat/{id}` route should respond with a JSON payload. The route should also respond with the correct headers for a JSON response (`Content-Type: application/json`).

The server should only support this GET route. That means that any other routes or any other verbs should be handled according to the HTTP specification. Thankfully Express and Fastify will do most of this for us.

The following cases must be successfully handled:

• A successful request should respond with a `200` status code. Express and Fastify do this automatically.
• The response should have the correct mime type header. In this case we need to make sure the `Content-Type` header is set to `application/json`.
• A GET request to a route that does not exist should respond with a `404` status code. Fastify does this automatically and the typical Express configuration also handles this by default.
• If a given boat ID isn't found in the model the server should respond with a `404` status code. The response body can contain anything, but it's important that the response status is set to 404.
• Unexpected errors in the model should cause the server to respond with a `500` status code. This means that if the read method of the model passed an Error object to the callback that was unexpected or unrecognized, that error needs to be propagated to the framework we're using in some way so that the framework can automatically generate a 500 response.
• In the HTTP specification there is some ambiguity over how to handle unsupported HTTP methods. Any HTTP method other than GET should be responded to with either a `400`, `404` or `405` status code. Again Fastify and Express will respond to unsupported methods with one of these status codes
