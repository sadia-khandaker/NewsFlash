import express from "express";
import { unlikePost, getAllPersonalPostAnon, getAllPosts, createPost, editPost, deletePost, likePost, getPost, getAllPersonalPost} from "../Controllers/PostController.js";

const router = express.Router();

router.get('/', getPost)
router.get('/getallposts', getAllPosts)
router.post('/create', createPost)
router.delete('/delete', deletePost);
router.put('/edit', editPost);
router.post('/like', likePost);
router.post('/unlike', unlikePost);
router.get('/:userId/personalposts', getAllPersonalPost);
router.get('/:userId/personalposts/anon', getAllPersonalPostAnon);

export default router;
