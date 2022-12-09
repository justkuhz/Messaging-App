// This class holds the api endpoints we are creating for the User model.

const express = require('express');
const { registerUser } = require('../controllers/userControllers');

// router API /
const router = express.Router();

// router API POST for registering a new user
router.route('/').post(registerUser);

// router API POST for confirming a username + password exists in database
router.route('/login').post(authUser);

module.exports = router;