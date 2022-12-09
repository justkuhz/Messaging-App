// User Model and Functions

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        // name
        name: { type: String, required: true },
        // email
        email: { type: String, required: true, unique: true },
        // password
        password: { type: String, required: true },
        // picture of user
        picture: {
            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            },   
        },
    { timestameps: true }
);

// encrpyt a given password to authenticate with passwords in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

// before saving user data into database, encrypt the password
userSchema.pre('save', async function (next) {
    if (!this.isModified()) {
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

module.exports = User;