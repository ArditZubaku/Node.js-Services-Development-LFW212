"use strict";

const { randomBytes } = require("crypto");
const { setTimeout: sleep } = require("node:timers/promises");

async function data() {
  await sleep(50);
  return randomBytes(10).toString("base64");
}

module.exports = data;
