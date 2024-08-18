import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import axios from "axios";

const BlogCardContainer = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_blogs");
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error while calling fetch blogs api: ", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
    {/* {console.log("POST_SIZE: ", posts.size())} */}
      
      {      
      posts.map((post) => (
        <Card
          key={post._id}
          id = {post._id}
          title={post.title}
          date={post.createdAt}
          author={post.author}
          content={post.content}
          likes={post.likes}
        />
      ))}
    </>
  );
};

export default BlogCardContainer;
