const mongoose = require("mongoose");
function connect() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database is Connected");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = connect;
