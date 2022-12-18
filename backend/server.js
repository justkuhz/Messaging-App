// Local webserver request

const express = require('express');
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { use } = require("./routes/userRoutes");

// connects to .env file
dotenv.config();

// connects to database hosted on mongo
connectDB();

// app API /
const app = express();

// app API use to allow the app to take JSON data
app.use(express.json());

// app API GET to check if the webserver is up
app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

// app API to accomodate router / API endpoints -- creating and authenticating users
app.use("/api/user", userRoutes);

// app API to accomodate router / API endpoints -- managing chats
app.use("/api/chat", chatRoutes);

// app API to accomodate router / API endpoints -- sending and receiving messages
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000; // PORT set to 8000 by default

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// app API to check if our local server started or not and the port it is on
const server = app.listen(
  PORT,
  console.log(`Server started on PORT ${PORT}`.yellow.bold)
);

// Setting up socket.io functionality on local-host server
const io = require("socket.io")(server, {
  pingTimeout: 60000, // timeout after 60s to save bandwidth
  cors: {
    origin: "http://localhost:3000",
  },
});

// Connection point for server-client sockets
io.on("connection", (socket) => {
  console.log("Connected to Socket.IO".blue.bold);

  // Create new socket for connection
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // User joins socket for a chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room " + room);
  });

  // Socket for receiving messages
  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined"); // return if chat has no users

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return; // skip us so we don't send it to ourselves

      // Inside the user's room, emit or send the new message
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});
