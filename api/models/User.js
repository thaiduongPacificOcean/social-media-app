import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        bio: {
            type: String
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: "User"
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: "User"
            }
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: "Post"
            }
        ],
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);