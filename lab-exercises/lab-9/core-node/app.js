"use strict";

const http = require("http");
const { URL } = require("url");

const server = http.createServer((req, res) => {
  // Only allow GET requests
  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
    return;
  }

  // Parse the URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // Check if request is to root path
  if (parsedUrl.pathname !== "/") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
    return;
  }

  // Check for url query parameter
  const targetUrl = parsedUrl.searchParams.get("url");
  if (!targetUrl) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Bad Request");
    return;
  }

  // Validate the target URL
  let targetUrlObj;
  try {
    targetUrlObj = new URL(targetUrl);
    // Only allow HTTP URLs as per requirements
    if (targetUrlObj.protocol !== "http:") {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request - Only HTTP URLs are supported");
      return;
    }
  } catch (err) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Bad Request - Invalid URL");
    return;
  }

  // Make the proxy request
  const proxyReq = http.request(targetUrlObj, (proxyRes) => {
    // Forward the status code
    res.writeHead(proxyRes.statusCode, proxyRes.headers);

    // Pipe the response body
    proxyRes.pipe(res);
  });

  // Handle proxy request errors
  proxyReq.on("error", (err) => {
    console.error("Proxy request error:", err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });

  // Handle client disconnect
  req.on("close", () => {
    proxyReq.destroy();
  });

  // Send the proxy request
  proxyReq.end();
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
