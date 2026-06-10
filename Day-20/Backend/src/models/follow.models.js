const mongoose = require('mongoose');

// Follow documents represent requests and accepted relationships between usernames.
const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required']
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required']
    },
    status: {
        type: String,
        default: 'pending',
        enum:{
            values: ['pending', 'accepted', 'rejected'],
            message: 'status can only be pending, accepted or rejected'
        } 
    }
}, {
    timestamps: true
})

// Only one relationship/request can exist for the same follower-following pair.
followSchema.index({ follower: 1, following: 1 }, { unique: true })

const followModel = mongoose.model('follows', followSchema);

module.exports = followModel;
