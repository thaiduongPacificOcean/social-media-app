import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export const createConversation = async (req, res) => {
    const { userId1, userId2 } = req.body;

    try {
        let conversation = await Conversation.findOne({ members: { $all: [userId1, userId2] } });

        if (conversation) {
            return res.status(200).json(conversation);
        }

        // new Conversation Chat
        conversation = new Conversation({
            members: [userId1, userId2],
        });

        const savedConversation = await conversation.save();
        res.status(201).json(savedConversation);

    } catch (error) {
        res.status(500).json({ message: "Failed to create conversation", error });
    }
};
export const sendMessage = async (req, res) => {
    const { conversationId, text, senderId } = req.body;

    try {
        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        const newMessage = new Message({
            conversationId,
            sender: senderId,
            text,
        })
        const savedMessage = await newMessage.save();

        res.status(200).json({ data: savedMessage });

    } catch (error) {
        res.status(500).json({ message: "Failed to send message", error });
    }
}
export const getLastMessages = async (req, res) => {

    const { userId, partnerId } = req.params;


    try {
        // Lấy tất cả các cuộc trò chuyện của người dùng
        const conversations = await Conversation.find({
            members: { $all: [userId, partnerId] }
        })

        const lastMessages = await Promise.all(conversations.map(async (conversation) => {
            const lastMessage = await Message.findOne({ conversationId: conversation._id })
                .sort({ createdAt: -1 })
                .populate('sender') 
                .populate('conversationId'); 

            return {
                conversationId: conversation._id,
                lastMessage,
            };
        }));

        res.status(200).json(lastMessages);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getConversationsByUserId = async (req, res) => {
    const { userId, partnerId } = req.params;

    try {
        const conversations = await Conversation.find({
            members: { $all: [userId, partnerId] }
        })
            .populate("members");

        res.status(200).json(conversations);

    } catch (error) {
        res.status(500).json({ message: "Failed to get conversations", error });
    }
};

export const getMessagesByConversationId = async (req, res) => {
    const { conversationId } = req.params;

    try {
        const messages = await Message.find({ conversationId })
            .populate("sender")
            .sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Failed to get messages", error });
    }
};
export const getMessageById = async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findById(messageId).populate("sender");
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: "Failed to get message", error });
    }
};
