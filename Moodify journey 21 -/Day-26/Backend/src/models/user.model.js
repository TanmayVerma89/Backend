const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique:[true, "User with this username already exists"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique:[true, "User with this email already exists"]
    },
    password:{
        type: String,
        required:[true, "password is required"],
        select:false
    }
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;