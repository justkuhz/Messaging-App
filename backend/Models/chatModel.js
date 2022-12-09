const mongoose = require('mongoose');

const chatModel = mongoose.Schema({
    // chat name
    chatName: { type: String, trim: true },
    // group chat
    isGroupChat: { type: Boolean, default: false },
    // users
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    // latest message
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",

    },
    // admin of group
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}   ,{
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
