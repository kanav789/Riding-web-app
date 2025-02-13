const app = require("./app");
const http = require("http");
const { initializeSocket } = require("./socket");
const port = process.env.PORT;
const server = http.createServer(app);

// Initialize socket
initializeSocket(server);
server.listen(port, () => {
  console.log(`Server is listen on Port No. ${port}`);
});
