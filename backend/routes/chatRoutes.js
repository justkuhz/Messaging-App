const express = require("express");
const { accessChat, fetchChat, createGC, renameGC, removeFromGC, addToGC } = require("../controllers/chatControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// protect keyword means only users who are logged in can access this route

// POST creating chat or access chat
router.route("/").post(protect, accessChat);

// GET get all of the chats from the database for that particular user
router.route("/").get(protect, fetchChat);

// POST to create a group chat
router.route("/group").post(protect, createGC);

// PUT to update information in db group chat
router.route("/rename").put(protect, renameGC);

// PUT to add/remove members in db group chat
router.route("/groupadd").put(protect, addToGC);
router.route("/groupremove").put(protect, removeFromGC);

module.exports = router;