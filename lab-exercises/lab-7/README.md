# Implement a RESTful JSON DELETE

Use either Fastify or Express to implement a RESTful HTTP server so that when the command `npm start` is executed it starts a server that listens on `process.env.PORT`.

The server should support a DELETE request to `/boat/{id}` where `{id}` is a placeholder for any given ID - for instance `/boat/2`.

A successful request should result in an empty response body with a 204 No Content status code. If the specified ID does not exist, the response should have a 404 status code. Any unexpected errors should result in a 500 Server Error response.

The service must also support the same GET `/boat/{id}` route as implemented in the previous chapter. Feel free to copy the files and folders from the labs-1 answer into this labs-2 answer or start from scratch as preferred.
