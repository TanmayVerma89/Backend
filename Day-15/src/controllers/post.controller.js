const postModel = require('../models/post.model');
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    console.log(req.body, req.file);

    if (!req.file) {
        console.log("FILE NOT RECEIVED");
        return res.status(404).send("No file");
    }

    const file = await imagekit.files.upload({
    file: await toFile(req.file.buffer, 'file'),
        fileName: 'file',
    });

    res.status(201).json({
        message: 'Post created',
        file
    })
}

module.exports = {
    createPostController
}