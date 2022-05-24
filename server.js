const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {cors: {origin: "*"}});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Chat Bot";

// Run when a client connects
io.on("connection", (socket) => {

  console.log("New Web Socket connection");
  
  socket.on("join-room", ({ username, room, companyId }) => {
    console.log(`joingRoom event: [username: ${username}] [room: ${room}] [socket_id:] ${socket.id}`);
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
  });

  socket.on("send-message", message => {
    const user = getCurrentUser(socket.id);
    console.log(`chatMessage event: [message: ${message}] from user: ${user.username}`);
    socket.to(user.room).emit("message", formatMessage(user.username, message));
  });
  






  socket.on("joinRoom", ({ username, room }) => {

    console.log(`joingRoom event: [username: ${username}] [room: ${room}]`);

    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    console.log(`chatMessage event: [message: ${msg}] from user: ${user.username}`);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

//Run server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
