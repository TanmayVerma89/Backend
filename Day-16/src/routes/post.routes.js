const express = require('express');
const postController = require('../controllers/post.controller');
const postRouter = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/post [protected]
 * req.body - { caption ,image-file }
 */
postRouter.post('/posts',upload.single("image"), postController.createPostController);

/**
 * GET /api/posts [protected]
 */
postRouter.get('/posts',postController.getPostController);

/**
 * GET /api/posts/details/:postId [protected]
 * -return details about a specific post by the postId.
 * - Also checks post is belong to user who is requesting for details 
 */
postRouter.get("/posts/details/:postId",postController.getPostDetailController)

module.exports = postRouter;
