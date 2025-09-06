"use strict";

const { URL } = require("node:url");
const http = require("node:http");
const PORT = process.env.PORT || 3000;
const { STATUS_CODES } = http;

const hello = `<html>
  <head>
    <style>
     body { background: #333; margin: 1.25rem }
     h1 { color: #EEE; font-family: sans-serif }
   </style>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`;

const root = `<html>
<head>
  <style>
   body { background: #333; margin: 1.25rem }
   a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.method !== "GET") {
    // Set the HTTP status code to 405 (Method Not Allowed) and send its description as the response body.
    res.statusCode = 405;
    res.end(STATUS_CODES[res.statusCode] + "\r\n");
    return;
  }
  // const { pathname } = url.parse(req.url) // Deprecated: Use the WHATWG URL API instead.
  // https://nodejs.org/dist/latest-v22.x/docs/api/url.html#whatwg-api
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  if (pathname === "/") {
    // no need to set res.statusCode because the default res.statusCode is 200 (OK).
    res.end(root);
    return;
  }
  if (pathname === "/hello") {
    res.end(hello);
    return;
  }
  res.statusCode = 404;
  res.end(STATUS_CODES[res.statusCode] + "\r\n");
});

server.listen(PORT);
