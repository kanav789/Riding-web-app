const { Server } = require("socket.io");
let io;
const UserModel =require('./models/userModel');
const CaptainModel =require('./models/captainModel');



function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    socket.on("join", async(data)=>{
  
      const {userId, userType} = data;
      console.log(`User ${userId} joined as ${userType}`);
      if (userType === "user") {
        const user = await UserModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        const captain = await CaptainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    })
  

    socket.on("update-location-captain", async(data)=>{
     const {userId, location} = data;
 
     if(!location || !location.ltd || !location.lng){
       return socket.emit("error", {message:"Invalid location data"});
     }
     await CaptainModel.findByIdAndUpdate(userId, {location:{
      ltd:location.ltd,
      lng:location.lng
     }});
         
    })

     
    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, event, data) {
  if (io) {
    io.to(socketId).emit(event, data);
  } else {
    console.error("Socket.io is not initialized");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
