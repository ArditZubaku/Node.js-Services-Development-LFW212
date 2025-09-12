Implement a RESTful JSON POST

Use either Fastify or Express to implement a RESTful HTTP server so that when the command `npm start` is executed it starts a server that listens on `process.env.PORT`.

The server should support a POST request to `/boat` that uses the `model.js` file to create a new entry. The route should only accept `application/json` mime-type requests and should respond with `application/json` content-type responses.

The POST request should expect JSON data to be sent in the following format:

```json
{
  "data": {
    "brand": "...",
    "color": "..."
  }
}
```

A successful request should respond with a `201 Created` status code. Unexpected errors should result in a `500 Server Error` response.

The service must also support the same `GET /boat/{id}` route as implemented in the previous chapter.

It is not necessary to validate user input for this exercise. Feel free to copy the files and folders from the `labs-1` answer of the previous chapter into the `labs-1` folder of this chapter and then build upon, or else start from scratch, as preferred.
