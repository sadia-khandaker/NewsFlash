import express from "express";

import { isFollowingUser, getAllUsers, getUser, updateUser, followUser, unfollowUser, getAllFollowers, getAllFollowings } from "../controllers/UserController.js";

const router = express.Router();
router.get('/:id/getuser', getUser);
router.get('/', getAllUsers);
router.get('/:id/getFollowers', getAllFollowers);
router.get('/:id/getFollowings', getAllFollowings);
router.put('/update/:id', updateUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);
router.get('/:id/following/:targetUserId', isFollowingUser);


export default router;