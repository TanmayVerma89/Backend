const express = require('express');
const postController = require('../controllers/post.controller');
const postRouter = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Post /api/posts [protected]
 * req.body = { img_url ,caption }
 */

postRouter.post('/posts', upload.single("image"), postController.createPostController);


module.exports = postRouter;