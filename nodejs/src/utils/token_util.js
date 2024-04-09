const { sign } = require("jsonwebtoken");

const generateToken = ({ email, username }) =>
  sign({ user: { email, username } }, process.env.JWT_SECRET || "superSecret", {
    expiresIn: "1d",
  });

module.exports = generateToken;
