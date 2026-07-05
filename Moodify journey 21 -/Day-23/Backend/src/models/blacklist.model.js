const mongoose = require('mongoose');
const { timeStamp } = require('node:console');

const blacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

blacklistSchema.index(
    { createdAt: 1 },
    {
        expireAfterSeconds: 60 * 60 * 24, // 24 hours
    }
);


const blacklistModel = mongoose.model('blacklist', blacklistSchema);

module.exports = blacklistModel;