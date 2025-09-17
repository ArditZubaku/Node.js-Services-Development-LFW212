"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const { PORT = 3000 } = process.env;

router.get("/", (req, res) => {
  setTimeout(() => {
    const un = req.query.un;

    if (Array.isArray(un)) {
      // If multiple un parameters, return 400 Bad Request
      return (
        res
          .status(400)
          // .type("text/plain")
          .send("Bad Request: Multiple 'un' parameters not allowed")
      );
    }

    // Normal case: single parameter or no parameter
    res.send((un || "").toUpperCase());
  }, 1000);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
