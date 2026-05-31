const express = require('express');
const identifyUser = require('../middlewares/auth.middleware');
const userController = require("../controllers/user.controller")
const userRouter = express.Router();

userRouter.post('/follow/:username',identifyUser,userController.followUserRequestController)
userRouter.patch('/follow/:follower/accept',identifyUser,userController.acceptFollowRequestController)
userRouter.delete('/follow/:follower/reject',identifyUser,userController.rejectFollowRequestController)
userRouter.delete('/unfollow/:username',identifyUser,userController.unfollowUserController)

module.exports = userRouter;