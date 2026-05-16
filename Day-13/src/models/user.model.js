const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {
        type: String,
        unique: [true, "User s already registered with this email"]
    }
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;