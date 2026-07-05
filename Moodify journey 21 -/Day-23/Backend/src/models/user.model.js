const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already exists"],
        required: [true, 'username is required']
    },
    email: {
        type: String,
        unique: [true, "user already exists with this email"],
        required: [true, 'email is required']
    },
    password: {
        type: String,
        select: false,
        required: [true, "password is required"]
    }
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel