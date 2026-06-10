const mongoose = require('mongoose');

// Each post belongs to one user and stores the hosted image URL plus an optional caption.
const postSchema= new mongoose.Schema({
    imageUrl:{
        type: String,
        required: [true,"Image is required to post Something"]
    },
    caption:{
        type:String,
        default: ''
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required to create any post"]
    }
})

const postModel = mongoose.model('posts', postSchema);

module.exports = postModel;
