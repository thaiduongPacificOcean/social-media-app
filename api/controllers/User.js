import User from "../models/User.js";

// Follow a user
export const followUser = async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;
    if (userId === id) {
        return res.status(400).json({ message: "You cannot follow yourself." });
    }

    try {
        const userToFollow = await User.findById(id);
        const currentUser = await User.findById(userId);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: "User not found." });
        }

        if (!currentUser.following.includes(id)) {
            currentUser.following.push(id);
            await currentUser.save();

            userToFollow.followers.push(userId);
            await userToFollow.save();

            res.status(200).json({ message: "User followed successfully." });
        } else {
            res.status(400).json({ message: "You are already following this user." });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
    }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;

    if (userId === id) {
        return res.status(400).json({ message: "You cannot unfollow yourself." });
    }

    try {
        const userToUnfollow = await User.findById(id);
        const currentUser = await User.findById(userId);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Kiểm tra xem đã follow chưa
        if (currentUser.following.includes(id)) {
            currentUser.following = currentUser.following.filter(followingId => followingId.toString() !== id);
            await currentUser.save();

            userToUnfollow.followers = userToUnfollow.followers.filter(followerId => followerId.toString() !== userId);
            await userToUnfollow.save();

            res.status(200).json({ message: "User unfollowed successfully." });
        } else {
            res.status(400).json({ message: "You are not following this user." });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}