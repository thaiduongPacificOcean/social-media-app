import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment"
        }
    ],
}, { timestamps: true });
export default mongoose.model("Post", PostSchema);
