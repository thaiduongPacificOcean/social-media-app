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
export const getConversationsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const conversations = await Conversation.find({ members: userId })
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
