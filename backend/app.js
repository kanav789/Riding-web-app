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
const captainrouter = require("./routes/captainroutes.js");
const maprouter = require("./routes/maproutes.js");
const rideroutes = require("./routes/rideroutes.js");

app.use("/api", userrouter);
app.use("/api/captain", captainrouter);
app.use("/api/map", maprouter);
app.use("/api/ride", rideroutes);


module.exports = app;
