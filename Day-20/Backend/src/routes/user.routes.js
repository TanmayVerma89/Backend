const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

// Follow-management routes use the authenticated username attached by identifyUser.
// @Routes post /

userRouter.post('/follow/:userId',identifyUser,userController.followUserRequestController)
userRouter.patch('/follow/:follower/accept',identifyUser,userController.acceptFollowRequestController)
userRouter.delete('/follow/:follower/reject',identifyUser,userController.rejectFollowRequestController)
userRouter.delete('/unfollow/:userId',identifyUser,userController.unfollowUserController)

module.exports = userRouter;
