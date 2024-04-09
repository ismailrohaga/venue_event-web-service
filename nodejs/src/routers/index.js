const authRouter = require("./auth_route");

const routes = (app) => {
  app.use("/auth", authRouter);
};

module.exports = routes;
