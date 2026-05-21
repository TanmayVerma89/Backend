const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type:String,
        default:""
    },
    img_url: {
        type: String,
        required: [true,'Img_url is required for creating a post']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User id is requiredfor creating a post"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel;