const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unquie: [true, "User already exists with this username"],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        unquie: [true, "User already exists with this email"],
        required: [true, 'Email is required']
    },
    password:{
        type:String,
        required:[true, 'password is required'],
        select:false
    }
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;