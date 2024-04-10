const { asyncWrapper } = require("../utils");
const { AuthService, TokenService, UserService } = require("../services");

const authService = new AuthService();
const tokenService = new TokenService();
const userService = new UserService();

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await authService.login(email, password);
  const generateAccessToken = await tokenService.generateAccessToken(findUser);

  res.send({
    user: findUser,
    accessToken: generateAccessToken,
  });
});

const register = asyncWrapper(async (req, res) => {
  const createdUser = await authService.register(req.body);
  const generateAccessToken = await tokenService.generateAccessToken(
    createdUser
  );

  res.send({
    user: createdUser,
    accessToken: generateAccessToken,
  });
});

const getProfile = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const user = await userService.getUser(userId);
  res.send({ user });
});

const logout = asyncWrapper(async (req, res) => {
  const { authorization } = req.headers;

  let token = authorization.split(" ")[1];
  await authService.logout(token);

  res.send({ message: "Token successfully revoked!" });
});

module.exports = {
  login,
  register,
  getProfile,
  logout,
};
