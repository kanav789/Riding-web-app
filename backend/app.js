const express = require("express");
const dotenv = require("dotenv");
const connect = require("./Db/db.js");

dotenv.config();
connect();
const app = express();
const cors = require("cors");

app.use(cors());

module.exports = app;
