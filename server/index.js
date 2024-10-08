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
  .catch((err) => {
    console.log("MongoDB Not Connected!: ", err);
    alert("Connection issue with MongoDB! Please try again later!");
  });

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
    alert("Problem with saving your post! Please try again later.");
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
    alert("Problem with saving user data! Please try again later.");
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
      .status(500)
      .json({ message: "Comment not saved because: " + error.message });
    alert("Problem with saving your comment! Please try again later.");
  }
});

// To read list of all blogs
app.get("/get_blogs", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error while fetching blogs: ", error);
    alert("Problem while fetching the blogs! Please try again later.");
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
    alert("Problem with fetching your post! Please try again later.");
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
    alert("Problem with updating your comment! Please try again later.");
  }
});

// Update a blog post by ID
app.put("/post/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, jti } = req.body;

  try {
      // Find the blog post by ID
      const post = await Post.findById(id);

      if (!post) {
          return res.status(404).json({ message: "Blog post not found" });
      }

      // Update the blog post with new title and content
      post.title = title;
      post.content = content;

      await post.save();

      res.status(200).json({ message: "Blog post updated successfully", post });
  } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// To delete content
app.delete("/delete_comment/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Comment Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    alert("Problem with deleting your comment! Please try again later.");
  }
});

// GET /posts/author/:authorName - Fetch blogs by author
app.get("/posts/author/:authorName", async (req, res) => {
  try {
    const { authorName } = req.params;

    // Find all posts where the author matches the given authorName
    const posts = await Post.find({ author: authorName });

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found for this author" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching blogs by author:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/delete_blog/:id", async (req, res) => {
  try {
    const deletedBlog = await Post.findByIdAndDelete(req.params.id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    alert("Problem with deleting your Post! Please try again later.");
  }
});


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
