import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
        title: {
                type: String,
                required: true,
                trim: true,
        },
        author: {
                type: String,
                required: true,
        },
        content: {
                type: String,
                required: true,
        },
        likes: {
                type: Number,
                required: true,
        },
        jti: {
                type: String,
                required: true,
        }
        
}, {
        timestamps: true,
});

const Post = mongoose.model('Post', PostSchema);

export default Post;