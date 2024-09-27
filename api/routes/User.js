import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    followUser,
    unfollowUser,
    toggleFollowUser,
} from "../controllers/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello user, you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("hello user, you are logged in and you can delete your account")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    const check = req.user.isAdmin;
    res.send("hello admin, you are logged in and you can delete all accounts " + check)
})
router.put('/follow/:id/:userId', toggleFollowUser);

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getUsers);

export default router;