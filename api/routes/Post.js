import express from "express";
import { addComment, createPost, getCommnents, getCommnentsCount, getLikes, getPostbyUserId, getPosts, getPostTypeImagebyUserId, getPostTypeVideobyUserId, like } from "../controllers/Post.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post('/createPost', createPost);
router.get('/getLikes/:id', getLikes);
router.get('/getCommentsCount/:postId', getCommnentsCount);
router.get('/getComments/:postId', getCommnents);
router.post('/addComment/', addComment);
router.post('/like', like);
router.get('/getPosts', getPosts);
router.get('/getPostbyUserId/:userId', getPostbyUserId);
router.get('/getPostTypeImagebyUserId/:userId', getPostTypeImagebyUserId);
router.get('/getPostTypeVideobyUserId/:userId', getPostTypeVideobyUserId);


export default router