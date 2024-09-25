const Notification = require('../models/Notification');

const createNotification = async (recipientId, message, postId) => {
    try {
        const notification = new Notification({
            recipient: recipientId,
            message,
            postId
        });
        await notification.save();
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

module.exports = { createNotification };
