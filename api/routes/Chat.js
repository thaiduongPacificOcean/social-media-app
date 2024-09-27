import express from "express";
import { createConversation, getConversationsByUserId, getMessageById, sendMessage, getMessagesByConversationId, getLastMessages } from "../controllers/Chat.js";

const router = express.Router();

router.post("/createConversation", createConversation);
router.post("/sendMessage", sendMessage);
router.get("/getConversationsByUserId/:userId/:partnerId", getConversationsByUserId);
router.get("/getMessagesByConversationId/:conversationId", getMessagesByConversationId);
router.get("/getMessageById/:messageId", getMessageById);
router.get("/getLastMessages/:userId/:partnerId", getLastMessages);

export default router