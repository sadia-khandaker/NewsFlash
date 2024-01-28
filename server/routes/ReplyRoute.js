import express from 'express';
import { getAllReplyForPost, createReply, getReply, editReply, deleteReply, likeReply, addReplyToPost } from '../Controllers/ReplyController.js';

const router = express.Router();

router.get('/', getReply);
router.post('/create', createReply);
router.delete('/delete', deleteReply);
router.put('/edit', editReply);
router.put('/addreply', addReplyToPost);

router.put('/:id/like', likeReply);
router.get('/:id/allreplies', getAllReplyForPost);

export default router;