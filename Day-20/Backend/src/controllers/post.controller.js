const postModel = require('../models/post.model');
const likeModel = require('../models/likes.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

// Reuse one ImageKit client for every upload request handled by this process.
const imagekit = new ImageKit({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    if (!req.file) {
        return res.status(404).send('No file found')
    }

    // Convert multer's in-memory file buffer into the format expected by ImageKit.
    const file = await imagekit.files.upload({
        file: await ImageKit.toFile(req.file.buffer, 'file'),
        fileName: "file",
        folder: "Cohort-2-insta-clone-Posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        user: req.userId,
        imageUrl: file.url
    })

    const populatedPost = await post.populate("user");

    res.status(201).json({
        message: 'Post created',
        post: populatedPost
    });
}

async function getPostController(req, res) {

    const posts = await postModel.find({
        user: req.userId
    })

    res.status(200).json({
        message: "Post Fetched",
        posts
    })

}

async function getPostDetailController(req, res) {
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isUserAuthorized = post.user.toString() === req.userId.toString();

    if (!isUserAuthorized) {
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    res.status(200).json({
        message: "Fetched Post",
        post
    })

}

async function likePostController(req, res) {

    const userId = req.userId
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: userId
    })

    if (isAlreadyLiked) {
        return res.status(409).json({
            message: `Already Liked`,
        });
    }

    const like = await likeModel.create({
        post: postId,
        user: userId
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}

async function unLikePostController(req, res) {
    const postId = req.params.postId
    const userId = req.userId

    const isLiked = await likeModel.findOne({
        post: postId,
        user: userId
    })

    if (!isLiked) {
        return res.status(400).json({
            message: "Post didn't like"
        })
    }

    await likeModel.findByIdAndDelete(isLiked._id)

    return res.status(200).json({
        message: "post un liked successfully."
    })
}

async function getFeedController(req, res) {

    const userId = req.userId;

    // Add a per-post like flag so the client can render the feed without extra requests.
    const posts = await Promise.all((await postModel.find().sort({ _id: -1 }).populate('user').lean()) //.lean() change the result from mongooseObject to object

        .map(async (post) => {

            const isLiked = await likeModel.findOne({
                post: post._id,
                user: userId
            })
            post.isLiked = Boolean(isLiked)
            return post
        }))

    res.status(200).json({
        message: `Fetched all posts successfully`,
        posts
    });
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailController,
    getFeedController,
    likePostController,
    unLikePostController
}
