const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "This Username is not available"],
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        unique: [true, "Email is already registered"],
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },

    bio: String,

    profile_image: {
        type: String,
        default: "s",
    },

})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel