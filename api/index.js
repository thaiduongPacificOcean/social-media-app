import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/Auth.js";
import usersRoute from "./routes/User.js";
import postsRoute from "./routes/Post.js";
import chatsRoute from "./routes/Chat.js";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// midlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/chats", chatsRoute);

app.get('/', (req, res) => {
  res.send('Hello Api');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
