require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "no_secret";

function sign(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30m",
  });
}

function verify(token, errCb) {
  return jwt.verify(token, JWT_SECRET, errCb);
}

module.exports = { jwt, sign, verify };
