const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imagekit = new ImageKit({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})



async function createPostController(req, res) {

    const token = req.cookies.jwt_token;

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    if (!req.file) {
        return res.status(404).send('No file found')
    }

    const file = await imagekit.files.upload({
        file: await ImageKit.toFile(req.file.buffer, 'file'),
        fileName: "file",
        folder: "Cohort-2-insta-clone-Posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        user: decoded.id,
        imageUrl: file.url
    })

    res.status(201).json({
        message: 'Post created',
        post
    });
}

async function getPostController(req,res) {
    const token = req.cookies.jwt_token;

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
    const userId = decoded.id;
    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message: "Post Fetched",
        posts
    })
    
}

async function getPostDetailController(req,res) {
    const token = req.cookies.jwt_token;

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    const userId = decoded.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isUserAuthorized = post.user.toString() === userId;

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

module.exports = {
    createPostController,
    getPostController,
    getPostDetailController
}