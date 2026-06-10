const mongoose = require('mongoose');

// Like documents record which user liked which post.
const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, 'Post is required to like']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, 'user is required to like']
    }
}, {
    timestamps: true
})

// Prevent the same user from liking the same post more than once.
likeSchema.index({post:1,user:1},{unique: true})

const likeModel = mongoose.model('likes', likeSchema);

module.exports = likeModel
