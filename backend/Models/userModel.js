const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // name
    name: { type: String, required: true },
    // email
    email: { type: String, required: true },
    // password
    password: { type: String, required: true },
    // picture of user
    picture: {
        type: String,
        required: true,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },   
}, {
    timestameps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;