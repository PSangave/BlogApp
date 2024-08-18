import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    comment_content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    jti: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
