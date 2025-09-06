const http = require("node:http");

// Listen only on localhost (127.0.0.1)
const HOST = "127.0.0.1"; // or "localhost"
const PORT = 3000;

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url, `http://${HOST}`);
    if (pathname === "/") {
      switch (req.method) {
        case "GET":
          res.statusCode = 200;
          return res.end();
        case "POST":
          res.statusCode = 405;
          return res.end();
        default:
          break;
      }
    }
  })
  .listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  });
