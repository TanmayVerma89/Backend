const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique: [true, "User Already Exists"],
        required : [true, "User required"]
    },
    email: {
        type: String,
        unique: [true,"User already Exists with this email"],
        required:[true, "Email is required"]
    },
    password:{
        type: String,
        select: false,
        required: [true, "password is required"]
    }
})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;