// Functions that use the User Models

const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../Models/userModel");

// Register user function, creates new users if one does not yet exist in database
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("User creation failure");
    }
});

// Checks if an email and its correct password exists in the db
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // there needs to be an email and the password needs to match
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

// /api/user?search= (called a query with variable called search)
// returns all users that include the letter k
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
            // or operator must fulfill at least one of the following two requests
            // if either of these requests match, it will return it as a JSON to the query

            // checking the search variable and "i" option matches both upper and lower case
                { name: { $regex: req.query.search, $options: "i" } }, // searching inside name
                { email: { $regex: req.query.search, $options: "i" } }, // searching inside email
                
            ],
        }
        : {};
    
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

module.exports = { registerUser, authUser, allUsers };