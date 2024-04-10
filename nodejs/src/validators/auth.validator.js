const { object, string, size, enums } = require("superstruct");

const Login = object({
  email: string(),
  password: string(),
});

const Register = object({
  email: string(),
  password: size(string(), 6, Infinity),
  name: string(),
  role: enums(["USER", "ADMIN"]),
});

module.exports = {
  Login,
  Register,
};
