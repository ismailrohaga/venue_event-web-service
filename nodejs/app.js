const express = require("express");
const expressConfig = require("./express");
const serverConfig = require("./server");
const router = require("./src/routers/api.route");
const createError = require("http-errors");
require("dotenv").config();

const app = express();
expressConfig(app, express);

app.use("/api", router);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const port = process.env.PORT || 3001;

serverConfig(app, port);
