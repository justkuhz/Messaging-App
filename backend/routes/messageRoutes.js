// API endpoints for /messages route

const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");

const router = express.Router();

// posting a new message sent by a user to db
router.route("/").post(protect, sendMessage);

// retrieve all messages for a particular chat
router.route("/:chatID").get(protect, allMessages);

module.exports = router;
