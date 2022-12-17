// Different functions to support the sending and receiving of messages

const expressAsyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");

// Sending a message
const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatID } = req.body;

  // Validate message content and sender
  if (!content || !chatID) {
    //Throw error if we are missing either field
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  // Message body
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatID,
  };

  // Query message into db
  try {
    var message = await Message.create(newMessage);

    // adding all of these attributes to our message object
    message = await message.populate("sender", "name picture");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name picture email",
    });

    // update latest message
    await Chat.findByIdAndUpdate(req.body.chatID, {
      latestMessage: message,
    });

    // return the final message object
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Retrieving all messages in a chat
const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    // access chatID via param of request ("/:chatID")
    const messages = await Message.find({ chat: req.params.chatID })
      .populate("sender", "name picture email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
