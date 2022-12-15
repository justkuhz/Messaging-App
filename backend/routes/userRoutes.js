// This class holds the api endpoints we are creating for the User model.

const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require("../middlewares/authMiddleware");

// router API endpoint
const router = express.Router();

// POST for registering a new user
// GET list of all users
router.route('/').post(registerUser).get(protect, allUsers);

// POST for confirming a username + password exists in database
router.route('/login').post(authUser);


module.exports = router;