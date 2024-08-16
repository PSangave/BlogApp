import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apis from './APIs/apis.js';
import Post from './models/Post.js';
import User from './models/User.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected!"))
.catch((err) => console.log("MongoDB Not Connected!: ", err));


// APIS 

app.get('/', (req, res) => {
        res.send('Welcome to blog API NEw');
});

// To post blog
app.post('/post', async (req, res) => {
        try {
                const newPost = new Post(req.body);
                const savedPost = await newPost.save();
                res.status(201).json(savedPost);
        } catch (error) {
                res.status(500).json({message: "Post not saved because:" + error.message});
        }
});

// To create new user
app.post('/create_user', async (req, res) => {
        try {
                const newUser = new User(req.body);
                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
        } catch (error) {
                res.status(500).json({message: "User not saved because:" + error.message});
        }
});

// To read list of all blogs
app.get('/get_blogs', async (req, res) => {
        try {
                const posts = await Post.find();
                res.status(200).json(posts);
        } catch (error) {
                console.log("Error while fetching blogs: ", error);
        }
})

app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`));


