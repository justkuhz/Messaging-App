const jwt = require('jsonwebtoken');
const User = require("../Models/userModel");
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        // req sends token in the header, we use the bearer token
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Bearer [tokenstringherethatisused]
            // Separates the token from the Bearer tag so we are only left with the token string
            token = req.headers.authorization.split(" ")[1];

            // decodes token id and verify through jwt npm
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // we find the user in the database and we return it without the password
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };