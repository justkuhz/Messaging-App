const mongoose = require("mongoose");

const messageModel = mongoose.Schema({
    // name/id of the sender
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // content of the message
    content: { type: String, trim: true },
    // reference to the chat
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
}, {
    timestamps: true,
}
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;