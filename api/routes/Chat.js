import express from "express";
import { createConversation, getConversationsByUserId, getMessageById, sendMessage, getMessagesByConversationId } from "../controllers/Chat.js";

const router = express.Router();

router.post("/createConversation", createConversation);
router.post("/sendMessage", sendMessage);
router.get("/getConversationsByUserId/:userId", getConversationsByUserId);
router.get("/getMessagesByConversationId/:conversationId", getMessagesByConversationId);
router.get("/getMessageById/:messageId", getMessageById);

export default router