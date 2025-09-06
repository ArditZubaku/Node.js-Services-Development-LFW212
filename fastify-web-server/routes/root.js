"use strict";

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

module.exports = async function (app, opts) {
  app.get("/", async function (_req, res) {
    res.type("text/html");
    return root;
  });
};
