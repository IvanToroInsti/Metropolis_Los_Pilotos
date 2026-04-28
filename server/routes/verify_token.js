const { jwt } = require("./jwt");

const JWT_SECRET = process.env.JWT_SECRET || "no_secret";

function verify_token(token) {
  if (!token) throw new Error("Falta token");

  const exists = jwt.verify(token, JWT_SECRET);

  if (!exists) {
    return false;
  }

  const token = jwt.decode(token);

  console.log(token);

  return token;
}

module.exports = { verify_token };
