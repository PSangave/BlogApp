import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import apis from "./APIs/apis.js";
import Post from "./models/Post.js";
import User from "./models/User.js";
import cors from "cors";
import Comment from "./models/Comment.js";

const ObjectId = mongoose.Types.ObjectId;

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("MongoDB Not Connected!: ", err));

// APIS

app.get("/", (req, res) => {
  res.send("Welcome to blog API NEw");
});

// To post blog
app.post("/post", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Post not saved because:" + error.message });
  }
});

// To create new user
app.post("/create_user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "User not saved because:" + error.message });
  }
});

// To post comment
app.post("/post_comment", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res
      .status(500).json({ message: "COmment not saved because: " + error.message });
  }
});

// To read list of all blogs
app.get("/get_blogs", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error while fetching blogs: ", error);
  }
});

// Create aggregation pipeline here to pull comments from given blog id
app.get("/get_blog/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await Post.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "blog_id",
          as: "comments",
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          author: 1,
          createdAt: 1,
          likes: 1,
          comments: 1,
        },
      },
    ]);

    res.json(result[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error fetching post", error });
  }
});

// To update comment
app.put("/update_comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment_content } = req.body;

    await Comment.findByIdAndUpdate(id, { comment_content });

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment" });
  }
});


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
