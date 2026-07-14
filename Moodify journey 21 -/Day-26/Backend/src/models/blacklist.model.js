const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required"]
        }
    },
    {
        timestamps: true
    }
)

blacklistSchema.index(
    { createdAt: 1 },
    {
        expireAfterSeconds: 60 * 60 * 24        // 24 Hours to expire
    }
)

const blacklistModel = mongoose.model('blacklist', blacklistSchema)

module.exports = blacklistModel;