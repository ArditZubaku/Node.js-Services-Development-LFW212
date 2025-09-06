const http = require("node:http");
const data = require("./data");

// Listen only on localhost (127.0.0.1)
const HOST = "127.0.0.1"; // or "localhost"
const PORT = 3000;

http
  .createServer(async (req, res) => {
    if (req.method === "GET") {
      const { pathname } = new URL(req.url, `http://${HOST}`);
      if (pathname === "/") {
        res.setHeader("Content-Type", "text/plain");
        return res.end(await data());
      }

      res.statusCode = 404;
      return res.end(http.STATUS_CODES[res.statusCode]);
    }

    // non-GET methods
    res.statusCode = 405;
    return res.end(http.STATUS_CODES[res.statusCode]);
  })
  .listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  });
