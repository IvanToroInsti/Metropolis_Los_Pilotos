require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "no_secret";

function sign(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30m",
  });
}

module.exports = { jwt, sign };
