const express = require("express");
const dotenv = require("dotenv");
const connect = require("./Db/db.js");
const cookieParser = require("cookie-parser");
dotenv.config();
connect();
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Routers

const userrouter = require("./routes/userRoutes.js");

app.use("/api", userrouter);
module.exports = app;
