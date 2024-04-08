const express = require("express");
const app = express();
const expressConfig = require("./express");
const serverConfig = require("./server");

expressConfig(app, express);

const port = process.env.PORT || 3001;

serverConfig(app, port);
