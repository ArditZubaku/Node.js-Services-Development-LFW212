const http = require("node:http");
const { URL } = require("node:url");
const { PORT, BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env;

const TIMEOUT_MS = 1250;

/***
 * @param {number} id
 * @returns {Promise<{ id: number, name: string}> | number}
 */
async function reqBrandService(id) {
  try {
    const res = await fetch(`http://localhost:${BRAND_SERVICE_PORT}/${id}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.status === 404) {
      return 404;
    } else if (![200, 400, 404].includes(res.status)) {
      return 500;
    }

    return await res.json();
  } catch (error) {
    return 500;
  }
}

/***
 * @param {number} id
 * @returns {Promise<{ id: number, brand: number, color: string}> | number}
 */
async function reqBoatService(id) {
  try {
    const res = await fetch(`http://localhost:${BOAT_SERVICE_PORT}/${id}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if ([400, 404].includes(res.status)) {
      return res.status;
    } else if (![200, 400, 404].includes(res.status)) {
      return 500;
    }

    return await res.json();
  } catch (error) {
    return 500;
  }
}

function isInt(value) {
  let x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

http
  .createServer(async (req, res) => {
    if (req.method === "GET") {
      const { pathname } = new URL(req.url, `http://localhost:${PORT}`);
      const id = Number(pathname.split("/").at(1));
      if (!isInt(id)) {
        res.statusCode = 400;
        res.end();
        return;
      }

      const reqBoatRes = await reqBoatService(id);

      if (isInt(reqBoatRes)) {
        res.setHeader("content-type", "application/json");
        res.statusCode = reqBoatRes;
        res.end(JSON.stringify({}));
        return;
      }
      const { id: boatID, color: boatColor, brand } = reqBoatRes;

      const reqBrandRes = await reqBrandService(brand);
      if (isInt(reqBrandRes)) {
        res.statusCode = reqBrandRes;
        res.end();
        return;
      }
      const { name: brandName } = reqBrandRes;

      const resObj = JSON.stringify({
        id: boatID,
        color: boatColor,
        brand: brandName,
      });

      res.writeHead(200, { "content-type": "application/json" });
      res.end(resObj);
      return;
    } else {
      // Q: What if I don't call return here?
      // A: The function would continue executing any code after this block, which could lead to unintended behavior or multiple responses being sent. It's best practice to return after sending a response.

      // Q: What if I don't call res.end but just return?
      // A: If you don't call res.end, the HTTP response will remain open and the client will hang, waiting for the response to finish. Always call res.end to properly terminate the response.

      res.statusCode = 405;
      res.end(http.STATUS_CODES[res.statusCode]);
      return;
    }
  })
  .listen(PORT);
