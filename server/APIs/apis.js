import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// Create new Post
router.post('/', async (req, res) => {
        try {
                const newPost = new Post(req.body);
                const savedPost = await newPost.save();
                res.status(201).json(savedPost);
        } catch (error) {
                res.status(500).json({message: "Post not saved because:" + error.message});
        }
});

export default router;