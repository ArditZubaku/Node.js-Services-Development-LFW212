# Validate a POST Request

Apply validation to the POST route request body so that any POST request bodies that do not have the shape `{ data: { brand, color } }` are rejected with a 400 Bad Request status code. Additional properties are allowed, but should be stripped before being stored. Do not remove or otherwise modify any of the routes.
