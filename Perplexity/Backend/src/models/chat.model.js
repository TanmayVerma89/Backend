import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A chat must belong to a user'],
        },
        title: {
            type: String,
            trim: true,
            maxlength: [200, 'Chat title cannot exceed 200 characters'],
            default: 'New chat',
        },
    },
    { timestamps: true },
);

// Supports fetching a user's most recently active chats.
chatSchema.index({ user: 1, updatedAt: -1 });

const chatModel = mongoose.model('Chat', chatSchema);

export default chatModel;
