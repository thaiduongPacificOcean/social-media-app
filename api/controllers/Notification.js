import Notification from "../models/Notification.js";
import Post from "../models/Post.js";


export const createNotification = async (recipient, message, postId) => {
    try {
        const notification = new Notification({
            recipient: recipient,
            message,
            postId
        });
        await notification.save();
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

export const getNotificationbyUserId = async (req, res, next) => {
    const authorId = req.params.authorId;
    try {
        // Lấy Post tác giả
        const posts = await Post.find({ author: authorId }).select('_id');
        // 
        const postIds = posts.map(post => post._id);

        const notification = await Notification.find(
            { postId: { $in: postIds } }
        ).populate('recipient')
            .populate('postId')
            .sort({ createdAt: -1 });

        console.log('Fetched notifications:', notification);

        res.status(200).json(notification);

    } catch (err) {
        console.log(err);
    }
}

export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find().populate('recipient').populate('postId').sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        next(err);
    }
}

