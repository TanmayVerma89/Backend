const express = require('express');
const postController = require('../controllers/post.controller');
const postRouter = express.Router();
const multer = require('multer');
const identifyUser = require('../middlewares/auth.middleware');

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @routes POST /api/post [protected]
 * @description Create a new post with an image. The image is uploaded using multer middleware and stored in memory
 */
postRouter.post('/posts', upload.single("image"), identifyUser, postController.createPostController);

/**
 * @routes GET /api/posts [protected]
 * @description Get all posts created by the authenticated user
 */
postRouter.get('/posts', identifyUser, postController.getPostController);

/**
 * @routes GET /api/posts/details/:postId [protected]
 * @description Get details of a specific post by its ID. The route checks if the post belongs to the authenticated user before returning the details.
 */
postRouter.get("/posts/details/:postId", identifyUser, postController.getPostDetailController)

module.exports = postRouter;
