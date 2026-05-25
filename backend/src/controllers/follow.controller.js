import userModel from "../models/auth.model.js";
import followmodel from "../models/follow.model.js";

export const FollowUserController = async (req, res) => {
    const followingId = req.params.userId;
    const followeeId = req.user._id;
    const followeeUsername = req.user.username;

    //Checks User is following Yourself
    if (followingId.toString() === followeeId.toString()) return res.status(400).json({ message: "You can not follow yourself" })

    // check Following User is Exist or Not
    const followingUser = await userModel.findById(followingId)
    if (!followingUser) return res.status(404).json({ message: "User Not Found" });
    const followingUserName = followingUser.username;

    //checks User Already Follow the User
    const ExistfollowAndFollowing = await followmodel.findOne({
        followee: followeeId,
        following: followingId,
        status: "accepted",
    })

    if (ExistfollowAndFollowing) return res.status(400).json({ message: "You are already following this user" })

    // When user Account is Private 
    if (followingUser.isPrivate) {
        const ExistUserRequest = await followmodel.findOne({
            followee: followeeId,
            following: followingId,
            status: "pending",
        });

        if (ExistUserRequest) return res.status(409).json({ message: "Follow Request Already Exists " });

        const UserFollowing = await followmodel.create({
            followee: followeeId,
            following: followingId,
            status: "pending"
        })
        return res.status(201).json({ message: "Follow Request Sent", UserFollowing })
    }
    const UserFollowing = await followmodel.create({
        followee: followeeId,
        following: followingId,
        status: "accepted"
    });

    return res.status(201).json({ message: `${followeeUsername} followed ${followingUserName}`, UserFollowing })
}

export const AcceptFollowRequestController = async (req, res) => {
    const requestId = req.params.requestId;
    const followingId = req.user._id;

    if (requestId.toString() === followingId.toString()) return res.status(400).json({ message: "You Can't Accept Your Follow Request" })

    const RequestFind = await followmodel.findOne({
        followee: requestId,
        following: followingId,
        status: "pending"
    });
    if (!RequestFind) return res.status(404).json({ message: "Request Not Found" });
    if (RequestFind.status === "accepted") return res.status(400).json({ message: "You Already accept the request" });


    // Accept Request 
    RequestFind.status = "accepted";
    const AcceptRequest = await RequestFind.save();
    return res.status(200).json({ message: "Follow Request Accepted", Request: AcceptRequest })
}

export const RejectFollowRequestController = async (req, res) => {
    const RejectRequestId = req.params.rejectId;
    const followingId = req.user._id;

    const findRejectRequest = await followmodel.findOne({
        followee: RejectRequestId,
        following: followingId,
    })

    if (!findRejectRequest) return res.status(400).json({ message: "Request Not Found" })

    await followmodel.findByIdAndDelete(findRejectRequest._id)

    return res.status(200).json({ message: "Follow request deleted successfully" });
}

export const AllPendingFollowRequestController = async (req, res) => {
    const UserId = req.user._id;

    const FindPendingRequests = await followmodel.find({
        following: UserId,
        status: "pending"
    });

    if (FindPendingRequests.length < 1) return res.status(200).json({ message: "No Pending Requests Found" , Request: [] });

    return res.status(200).json({ message: "Fetch All Follow Requests", Request: FindPendingRequests })
}

export const UnfollowUserController = async (req, res) => {
    const followingId = req.params.userId;
    const followeeId = req.user._id;
    const followeeUsername = req.user.username;

    if (followeeId.toString() === followingId.toString()) return res.status(400).json({ message: "You Can't Unfollow Yourself" });

    const followingUser = await userModel.findById(followingId);
    if (!followingUser) return res.status(404).json({ message: "User Not Found" });

    const FindUserFollowing = await followmodel.findOne({
        followee: followeeId,
        following: followingId,
        status: "accepted"
    })

    if (!FindUserFollowing) return res.status(404).json({ message: "Followed User Not Found" })

    const UnfollowUser = await followmodel.findByIdAndDelete(FindUserFollowing._id)

    return res.status(200).json({ message: `${followeeUsername} has unfollowed ${followingUser.username}`, UnfollowUser })
}