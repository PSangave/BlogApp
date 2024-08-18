import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import axios from "axios";
import CommentCard from "./CommentCard.jsx";

const CommentCardContainer = (comments) => {
        console.log("FROM CONTAINER: ", Object.values(comments));
  return (
    <>
    {/* {console.log("POST_SIZE: ", posts.size())} */}
      
      {      
      comments.map((comment) => (
        <CommentCard
          date={comment.createdAt}
          author={"Pranav"}
          content={comment.content}
          likes={comment.likes}
        />
      ))}
    </>
  );
};

export default CommentCardContainer;
