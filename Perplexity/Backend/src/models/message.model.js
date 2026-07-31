import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
            required: [true, 'A message must belong to a chat'],
        },
        content: {
            type: String,
            required: [true, 'Message content is required'],
            trim: true,
            maxlength: [1000000, 'Message content cannot exceed 1000000 characters'],
        },
        role: {
            type: String,
            required: true,
            enum: {
                values: ['user', 'ai'],
                message: 'Role must be either user or ai',
            },
        },
    },
    { timestamps: true },
);

// Supports loading a conversation in chronological order.
messageSchema.index({ chat: 1, createdAt: 1 });

const messageModel = mongoose.model('Message', messageSchema);

export default messageModel;
