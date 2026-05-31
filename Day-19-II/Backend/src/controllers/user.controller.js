const followModel = require("../models/follow.models")
const userModel = require('../models/user.model');

async function followUserRequestController(req, res, next) {
    const follower = req.username;
    const following = req.params.username;

    // Checks is user even exists
    const isFollowerUserExists = await userModel.findOne({
        username: following
    })

    if (!isFollowerUserExists) {
        return res.status(404).json({
            message: "User Not Exists"
        })
    }

    // checks is user trying to follow itself
    if (follower === following) {
        return res.status(409).json({
            message: 'You cannot follow yourself',
        });
    }

    // check user already follow user or not

    const isAlreadyFollowed = await followModel.findOne({
        follower: follower,
        following: following,
    })

    if (isAlreadyFollowed) {

        if (isAlreadyFollowed.status === 'pending') {
            return res.status(409).json({
                message: `You're follow request to ${following} is still pending!!`,
                isAlreadyFollowed
            });
        }

        if (isAlreadyFollowed.status === 'accepted') {
            return res.status(409).json({
                message: `You're already follows ${following}`,
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
        message: `You followed ${following}`,
        follow
    })
}

async function unfollowUserController(req, res, next) {
    const follower = req.username;
    const following = req.params.username;

    // Checks is user even exists
    const isFollowerUserExists = await userModel.findOne({
        username: following
    })

    if (!isFollowerUserExists) {
        return res.status(404).json({
            message: "User Not Exists"
        })
    }

    // checks is user trying to unfollow itself
    if (follower === following) {
        return res.status(409).json({
            message: 'You cannot unfollow yourself',
        });
    }

    // check user already follow user or not
    const isUserFollow = await followModel.findOne({
        follower: follower,
        following: following,
        status: 'accepted'
    })

    if (!isUserFollow) {
        return res.status(400).json({
            message: `you doesn't follow ${following}`,
        });
    }

    const unfollowRecord = await followModel.findByIdAndDelete(isUserFollow._id)

    res.status(200).json({
        message: `You unfollowed ${following}`,
    });
}

async function acceptFollowRequestController(req, res, next) {
    const follower = req.params.follower;
    const user = req.username;

    const isFollowerUserExists = await userModel.findOne({
        username: follower
    })

    if (!isFollowerUserExists) {
        return res.status(404).json({
            message: "User Not Exists"
        })
    }

    if (user === follower) {
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

    if (isRequestExists.status !== 'pending') {
        return res.status(409).json({
            message: `Follow request is not pending`,
        });
    }

    const acceptFollowRequest = await followModel.findByIdAndUpdate(isRequestExists._id, { status: 'accepted' }, { new: true });

    res.status(200).json({
        message: `Request accepted`,
        acceptFollowRequest
    });

}

async function rejectFollowRequestController(req, res, next) {
    const follower = req.params.follower;
    const user = req.username;

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