const mongoose = require('mongoose');

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
        required:[true, "Password is required"]
    },
    bio: String,
    profile_image: {
        type: String,
        default: ''
    }
})

const userModel = mongoose.model('users',userSchema);
module.exports = userModel;