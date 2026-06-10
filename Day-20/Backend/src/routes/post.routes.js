const express = require('express');
const postController = require('../controllers/post.controller');
const postRouter = express.Router();
const multer = require('multer');
const identifyUser = require('../middlewares/auth.middleware');

// Store uploaded files in memory so the controller can forward the buffer to ImageKit.
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @routes POST /api/posts 
 * @access Private
 * @description Create a new post with an image. The image is uploaded using multer middleware and stored in memory
 */
postRouter.post('/posts', upload.single("image"), identifyUser, postController.createPostController);

/**
 * @routes GET /api/posts 
 * @access Private
 * @description Get all posts created by the authenticated user
 */
postRouter.get('/posts', identifyUser, postController.getPostController);

/**
 * @routes GET /api/posts/details/:postId 
 * @access Private
 * @description Get details of a specific post by its ID. The route checks if the post belongs to the authenticated user before returning the details.
 */
postRouter.get("/posts/details/:postId", identifyUser, postController.getPostDetailController)

/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */
postRouter.post("/posts/like/:postId", identifyUser, postController.likePostController)

/**
 * @route POST /api/posts/unlikelike/:postid
 * @description unlike a post with the id provided in the request params. 
 */
postRouter.post("/posts/unlike/:postId", identifyUser, postController.unLikePostController)

/**
 * @Route Get /api/posts/feed
 * @access Private
 * @description Get all posts to show on feed of an user
 */ 
postRouter.get('/posts/feed',identifyUser, postController.getFeedController)

module.exports = postRouter;
