import express from "express";
import { getNotificationbyUserId, getNotifications } from "../controllers/Notification.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


router.get('/getNotificationbyUserId/:authorId', getNotificationbyUserId);
router.get('/getNotifications', getNotifications);


export default router