import UserModel from "../models/UserModel.js";
import mongoose from 'mongoose'; 


//req represents the HTTP request (has request query string, params, body, and HTTP headers)
//res represents the HTTP response
// Get a User By Id
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);

        if (user) {
            const { password, ...otherDetails } = user._doc
            res.status(200).json(otherDetails);
        }
        else {
            res.status(404).json("No such user exists")
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);

    }

};

//Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(users);
    }
};


//Get all followers of a user
export const getAllFollowers = async (req, res) => {
    const userId = req.params.id;
    const pipeline = [
        { $match: {_id: new mongoose.Types.ObjectId(userId)}},
        { $project: {followers: 1, _id: 0}}
    ];
    try {
        const followers = await UserModel.aggregate(pipeline);
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get all followings of a user
export const getAllFollowings = async (req, res) => {
    const userId = req.params.id;
    const pipeline = [
        { $match: {_id: new mongoose.Types.ObjectId(userId)}},
        { $project: {following: 1, _id: 0}}
    ];
    try {
        const followings = await UserModel.aggregate(pipeline);
        res.status(200).json(followings);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Update a user
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const isAnon = req.body.isAnon;
    const profilePicture = req.body.profilePicture;
    const displayName = req.body.displayName;
    const displayUsername = req.body.displayUsername;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log(`The current user is: ${userId}`);
    console.log(`The profilepicture is: ${profilePicture}`);
    console.log(`The displayName is: ${displayName}`);
    console.log(`The displayUsername is: ${displayUsername}`);
    try {
        const updatedUser = await UserModel.updateUserById(userId, isAnon, profilePicture, displayName, displayUsername, firstName, lastName, username, email, password);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

//Delete a user
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await UserModel.deleteUserById(userId);
        if (result) {
            res.status(204).send();
        } else {
            res.status(400).json({ message: "User could not be deleted: User not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "User could not be deleted: Server error occured" });
    }
};

//Follow a user
export const followUser = async (req, res) => {
    const currentUserId = req.params.id;
    const targetUserId = req.body.targetUserId;

    try {
        const currentUser = await UserModel.findById(currentUserId);
        await currentUser.followUser(targetUserId);

        res.status(200).json("User followed successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
};


//Unfollow a user
export const unfollowUser = async (req, res) => {
    const currentUserId = req.params.id;
    const targetUserId = req.body.targetUserId;

    try {
        const currentUser = await UserModel.findById(currentUserId);
        await currentUser.unfollowUser(targetUserId);

        res.status(200).json("User was unfollowed successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};

// Check if user follows another user
export const isFollowingUser = async (req, res) => {
    const currentUserId = req.params.id;
    const targetUserId = req.params.targetUserId;

    try {
        const currentUser = await UserModel.findById(currentUserId);

        const isFollowing = currentUser.following.includes(targetUserId);
        console.log(isFollowing);

        res.status(200).json(isFollowing );
    } catch (error) {
        res.status(500).json(error);
    }
};
