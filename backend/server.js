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
app.listen(PORT, console.log(`Server started on PORT ${PORT}`.yellow.bold));
