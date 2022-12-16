const expressAsyncHandler = require("express-async-handler");
const Chat = require('../Models/chatModel');
const User = require("../Models/userModel");

// Creating or fetching a one-on-one chat
const accessChat = expressAsyncHandler(async (req, res) => {

    // If a chat with this userID exists, return it
    // Otherwise, create a chat with this user
    const { userID } = req.body;

    // If the user ID is not avaible, throw error
    if (!userID) {
        console.log("UserID param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        // regex $and means both of the requests must be true to return the statements
        // we want to return the current user that is logged in and the userID we are sending to
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userID } } },
        ],
        // if the chat is found, we populate the users key with both user information except password
    }).populate("users", "-password")
        // fill in the latest messages information info into the isChat JSON
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender', // finds the sender of the latest message from message model
        select: "name picture email",
    });

    // if chat exists, send the chat. We send array element 0 since there should only be one chat between
    // these two users if it exists. (We make sure it is not a group chat)
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {  // chat not found
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userID],
        };
        // query chatData into db
        try {
            const createdChat = await Chat.create(chatData);
            
            // send chat data to user who is querying it
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );

            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }

});

const fetchChat = expressAsyncHandler(async (req, res) => {
    try {
        // Query all chats in db for a particular user
        // This mongoDB line finds and returns all chats with the user in it
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")        // Create user field
            .populate("groupAdmin", "-password")   // Create groupAdmin field
            .populate("latestMessage")             // Create latestMessage field
            .sort({ updatedAt: -1 })               // Sort by most recent
            .then(async (results) => {
                results = await User.populate(results, {
                    path: 'latestMessage.sender', // finds the sender of the latest message from message model
                    select: "name picture email",
                });

                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
   } 
});


const createGC = expressAsyncHandler(async (req, res) => {
    // We want to be able to have an array of users as well as a chat name that gets queueried into the DB
    if (!req.body.users || !req.body.name) { // Group chat cannot have no users or no name
        return res.status(400).send({ message: "Please fill in all the fields" });
    }

    // We take all of the users in the body of the request and pass it to the front-end w/ json format
    var users = JSON.parse(req.body.users);

    // A group should have more than 2 users to form a GC
    if (users.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat");
    }

    // Add the logged-in user to the GC user list
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            // Different fields for this group chat creation
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        // Fetch this chat from DB and send to the user
        const fetchGC = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")          // create users field array except password
            .populate("groupAdmin", "-password");    // create groupAdmin field array except password
        
        res.status(200).json(fetchGC);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGC = expressAsyncHandler(async (req, res) => {
    // Grabbing information from request
    const { chatID, chatName } = req.body;

    // This function finds a chat by its ID and then updates the information
    const updatedChat = await Chat.findByIdAndUpdate(
        chatID,
        {
            // set the chatName = to the chatName passed from our request
            chatName: chatName,
        }, {
        // this makes the function return the updated chatName value
        new: true,
    }
    )
        .populate("users", "-password")       // Create field for all the users in GC except pass
        .populate("groupAdmin", "-password"); // Create field for the admin of GC except pass
    
    // Check for errors
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat not found");
    } else {
        // if no errors, send the response in json format so we can display on front-end
        res.json(updatedChat);
    }
});

const addToGC = expressAsyncHandler(async (req, res) => {
    // Grab information from request
    const { chatID, userID } = req.body;

    // Find the chat by its ID and push a user into the users list
    const addMember = await Chat.findByIdAndUpdate(
        chatID,
        {
            $push: { users: userID },
        }, {
        new: true,
    })
        .populate("users", "-password")       // Create users field except password
        .populate("groupAdmin", "-password"); // Create groupAdmin field except password

    // Throw error if the addMember operation does not occur
    if (!addMember) {
        res.status(404);
        throw new Error("Chat not found");
    } else {
        // if no errors, send response in json format for use in front-end
        res.json(addMember); 
    }
});

const removeFromGC = expressAsyncHandler(async (req, res) => {
    // Grab information from request
    const { chatID, userID } = req.body;

    // Find the chat by its ID and push a user into the users list
    const removeMember = await Chat.findByIdAndUpdate(
        chatID,
        {
            $pull: { users: userID },
        }, {
        new: true,
    })
        .populate("users", "-password")       // Create users field except password
        .populate("groupAdmin", "-password"); // Create groupAdmin field except password

    // Throw error if the removeMember operation does not occur
    if (!removeMember) {
        res.status(404);
        throw new Error("Chat not found");
    } else {
        // if no errors, send response in json format for use in front-end
        res.json(removeMember); 
    }
});


module.exports = { accessChat, fetchChat, createGC, renameGC, addToGC, removeFromGC };