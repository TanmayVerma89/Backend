const mongoose = require('mongoose');

// User documents store public profile data and keep the password hidden by default.
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:[true, "This username is already taken"],
        required: [true,"Usernmae is required"]
    },
    email:{
        type: String,
        unique:[true, "This email is already exists"],
        required: [true,"Email is required"]
    },
    password: {
        type: String,
        required:[true, "Password is required"],
        // Password hashes are only exposed explicitly during login checks.
        select: false
    },
    bio: {
        type: String,
        default:"Some bio stuff"
    },
    profile_image: {
        type: String,
        default: 'https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
})

const userModel = mongoose.model('users',userSchema);
module.exports = userModel;
