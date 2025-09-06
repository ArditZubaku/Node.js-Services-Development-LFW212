"use strict";

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

module.exports = async function (app, opts) {
  app.get("/", async function (req, res) {
    res.type("text/html");
    return hello;
  });
};
