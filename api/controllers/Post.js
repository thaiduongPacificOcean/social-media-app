import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { createNotification } from "./Notification.js";

export const createPost = async (req, res) => {
    const { content, imageUrl, videoUrl, author } = req.body;
    try {
        const newPost = new Post({
            content,
            image: imageUrl || null,
            video: videoUrl || null,
            author
        })
        const savePost = await newPost.save();

        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savePost
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Faild to create'
        })
    }
}
export const like = async (req, res) => {

    const { postId, userId } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
            await post.save();
            return res.status(200).json({
                success: true,
                message: 'Post unliked successfully',
                likes: post.likes.length
            });
        }

        post.likes.push(userId);
        await post.save();

        // Create notification for like

        if (post.author._id.toString() !== userId) {
            await createNotification(
                userId,
                `${req.user.username} liked your post`,
                postId
            )
        }


        res.status(200).json({
            success: true,
            message: 'Post liked successfully',
            likes: post.likes.length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to like post',
            error
        });
    }
};
export const addComment = async (req, res) => {
    const { content, userId, postId } = req.body;
    try {
        const newComment = new Comment({
            author: userId,
            post: postId,
            content: content
        });
        const savedComment = await newComment.save();

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push(savedComment._id);
        await post.save();

        // Create notification for comment

        if (post.author._id.toString() !== userId) {
            await createNotification(
                userId,
                `${req.user.username} commented your post`,
                postId
            )
        }

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

export const getLikes = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId).select('likes');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const likesCount = post.likes.length;

        res.status(200).json({ likesCount });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching likes count', error });
    }
}

export const getCommnentsCount = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId).select('comments');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const commentsCount = post.comments.length;

        res.status(200).json({ commentsCount });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching likes count', error });
    }
}

export const getCommnents = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId).select('comments');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const comments = post.comments;

        res.status(200).json({ data: comments });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching likes count', error });
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        next(err);
    }
}

export const deletePost = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted.");
    } catch (err) {
        next(err);
    }
}

export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author').populate('comments').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

