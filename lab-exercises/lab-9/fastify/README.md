Implement an HTTP Route-Based Proxy

Create an HTTP service that initializes when `npm start` is executed and listens on whatever the `PORT` environment variable is set to.

The service must be a transparent reverse HTTP proxy server such that a request to `http://localhost:{PORT}/?url={URL}` will respond with:

1. the status code of `{URL}`
2. the headers provided at `{URL}`
3. the contents of the body at `{URL}`

The `{URL}` will only ever hold HTTP URLs; there's no need to proxy HTTPS URLs.

The service must meet the following conditions:

- A request to any route other than `/` should respond with an HTTP Not Found response.
- A request to `/` without a `url` query-string parameter should result in a Bad Request HTTP response.
- The proxy only needs to support HTTP GET requests.