const followModel = require("../models/follow.models")
const userModel = require('../models/user.model');

// Handles the follow-request lifecycle between two usernames.
async function followUserRequestController(req, res, next) {
    const follower = req.userId;
    const following = req.params.userId;

    // checks is user trying to follow itself
    if (follower.toString() === following) {
        return res.status(409).json({
            message: 'You cannot follow yourself',
        });
    }

    // Checks is user even exists
    const userToFollow = await userModel.findById(following)

    if (!userToFollow) {
        return res.status(404).json({
            message: "User Not Exists"
        })
    }

    // check user already follow user or not

    const isAlreadyFollowed = await followModel.findOne({
        follower: follower,
        following: following,
    })

    if (isAlreadyFollowed) {

        if (isAlreadyFollowed.status === 'pending') {
            return res.status(409).json({
                message: `You're follow request to ${userToFollow.username} is still pending!!`,
                isAlreadyFollowed
            });
        }

        if (isAlreadyFollowed.status === 'accepted') {
            return res.status(409).json({
                message: `You're already follows ${userToFollow.username}`,
                isAlreadyFollowed
            });
        }
    }
    // Creates Document for follow
    const follow = await followModel.create({
        follower: follower,
        following: following
    })

    res.status(201).json({
        message: `You followed ${userToFollow.username}`,
        follow
    })
}

async function unfollowUserController(req, res, next) {
    const follower = req.userId;
    const following = req.params.userId;

    // checks is user trying to unfollow itself
    if (follower.toString() === following) {
        return res.status(409).json({
            message: 'You cannot unfollow yourself',
        });
    }

    // Checks is user even exists
    const userToFollow = await userModel.findById(following)

    if (!userToFollow) {
        return res.status(404).json({
            message: "User Not Exists"
        })
    }

    // check user already follow user or not
    const isUserFollow = await followModel.findOne({
        follower: follower,
        following: following,
        status: 'accepted'
    })

    if (!isUserFollow) {
        return res.status(400).json({
            message: `you doesn't follow ${userToFollow.username}`,
        });
    }

    const unfollowRecord = await followModel.findByIdAndDelete(isUserFollow._id)

    res.status(200).json({
        message: `You unfollowed ${userToFollow.username}`,
    });
}

async function acceptFollowRequestController(req, res, next) {
    const follower = req.params.follower;
    const user = req.userId;

    // Only the target user can accept a pending request addressed to them.
    const isFollowerUserExists = await userModel.findById(follower)

    if (!isFollowerUserExists) {
        return res.status(404).json({
            message: "User Not Exists"
        })
    }

    if (user.toString() === follower.toString()) {
        return res.status(409).json({
            message: `You cannot accept your request`,
        });
    }

    const isRequestExists = await followModel.findOne({
        follower: follower,
        following: user
    })

    if (!isRequestExists) {
        return res.status(404).json({
            message: `Request doesn't exists`,
        });
    }

    if (isRequestExists.status === 'accepted') {
        return res.status(409).json({
            message: `Follow request already accepted`,
        });
    }
    
    const acceptFollowRequest = await followModel.findOneAndUpdate(
        {
            follower,
            following: user,
            status: 'pending'
        },
        {
            status: 'accepted'
        },
        {
            new: true
        }
    );

    res.status(200).json({
        message: `${isFollowerUserExists.username}'s follow request accepted`,
        acceptFollowRequest
    });

}

async function rejectFollowRequestController(req, res, next) {
    const follower = req.params.follower;
    const user = req.username;

    // Rejections delete the pending request instead of keeping a separate rejection record.
    const isFollowerUserExists = await userModel.findOne({
        username: follower
    })

    if (!isFollowerUserExists) {
        return res.status(404).json({
            message: "User Not Exists"
        })
    }

    const request = await followModel.findOne({
        follower,
        following: user
    })

    if (!request) {
        return res.status(404).json({
            message: "Follow request not found or you're not authorized to manage it",
        });
    }

    if (isRequestExists.status !== 'pending') {
        return res.status(409).json({
            message: `Follow request is not pending`,
        });
    }

    const rejectFollowRequest = await followModel.findByIdAndDelete(isRequestExists._id);

    res.status(200).json({
        message: `Request rejected`,
        rejectFollowRequest
    });

}

module.exports = {
    followUserRequestController,
    unfollowUserController,
    acceptFollowRequestController,
    rejectFollowRequestController
}
