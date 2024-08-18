# My Blog Application

## Project Overview

**My Blog Application** is a web-based platform built using the MERN (MongoDB, Express.js, React, Node.js) stack. This application allows users to create, read, update, and delete blog posts. Additionally, it provides features for commenting on blog posts, with real-time updates, and includes user authentication via Google OAuth. The application aims to be a simple yet powerful tool for users to express their thoughts and engage in discussions through blogs.

## Key Features

- **User Authentication**: Secure user login through Google OAuth, allowing users to create an account and manage their blogs.
- **Blog Management**: Users can create, edit, and delete blog posts. The home page displays a list of all blogs, while each blog page displays the blog content along with user comments.
- **Real-Time Comments**: Users can comment on blog posts with real-time updates, ensuring that all participants see new comments immediately.
- **Comment Editing and Deletion**: Users have the ability to edit or delete their comments, providing flexibility in managing their contributions.
- **Google Authentication**: Integrated Google OAuth for user authentication, ensuring a secure and familiar login experience.

## Technology Stack

- **Frontend**: React.js, React-Router-DOM, Redux, React Router, ReactQuill (for rich text editing).
- **Backend**: Node.js, Express.js, Mongoose.
- **Database**: MongoDB Atlas, utilized for storing user information, blog posts, and comments.

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your local machine.
- MongoDB Atlas account for cloud database hosting.

### Installation Steps

1. **Clone the repository**:
    ```bash
    git clone git@github.com:PSangave/BlogApp.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd my-blog-app
    ```
3. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```
4. **Install client dependencies**:
    ```bash
    cd ../client
    npm install
    ```
5. **Set up environment variables**:
   - Create a `.env` file in the `server` directory with the following variables:
     ```
     MONGO_URI=your_mongodb_atlas_uri
     GOOGLE_CLIENT_ID=your_google_client_id
     ```
6. **Start the development server**:
    ```bash
    cd ../server
    npx nodemon index.js
    ```
7. **Start the frontend**:
    ```bash
    cd ../client
    npm start
    ```

## Usage

- Navigate to the homepage to view all blog posts.
- Log in using your Google account to create a new blog post.
- Comment on blog posts and see the updates in real-time.
- Edit or delete your comments or blog posts from the respective pages.

### Please note I am writing this readme with the help of ChatGPT by giving entire project zip to him. 
