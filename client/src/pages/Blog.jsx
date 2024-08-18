import { Box, Button, TextField, styled, Typography } from "@mui/material";
import Banner from "../components/Banner";
import Header from "../components/Header";
import CommentCard from "../components/CommentCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getValueFromCookie } from "../utils/utility";

const BoxContainer = styled(Box)`
  width: 70%;
  margin: auto;
  padding: 50px;
`;

const BlogTitle = styled(Typography)`
  font-size: 60px;
  font-family: "Montserrat", sans-serif;
`;

const CommentTitle = styled(Typography)`
  font-size: 30px;
  font-family: "Montserrat", sans-serif;
`;

const DateAuthorHolder = styled(Box)`
  width: 100%;
  display: flex;
  margin-left: 5px;
`;

const BlogDate = styled(Typography)`
  font-size: 15px;
  font-family: "Montserrat", sans-serif;
`;

const BlogAuthor = styled(Typography)`
  margin-left: 20px;
  font-size: 15px;
  font-family: "Montserrat", sans-serif;
`;

const BlogContent = styled(Typography)`
  font-size: 17px;
  font-family: "Montserrat", sans-serif;
  margin: 40px 0px 10px 5px;
`;


const CommentBoxContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Blog = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const jti = getValueFromCookie(document.cookie, "jti");

  const { id } = useParams();
  const [cmntTxt, setCmntTxt] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  const [refreshId, setRefreshId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("Effect Calling...");

    if (jti) {
      setIsLoggedIn(true);
    }

    async function getBlogFromId() {
      const resp = await axios.get(`http://localhost:5000/get_blog/${id}`);

      setTitle(resp.data.title);
      setDate(resp.data.createdAt);
      setAuthor(resp.data.author);
      setContent(resp.data.content);
      setComment(resp.data.comments);
    }
    getBlogFromId();
  }, [id, refreshId, jti, navigate, isLoggedIn]); // Add refreshId as a dependency

  const handleSubmit = () => {
    if (!isLoggedIn) {
      alert("Please Login To Write Your Comment!");
      setCmntTxt("");
    } else {
      const blog_id = id;
      const comment_content = cmntTxt;
      const likes = 0;
      const comment_author =
        getValueFromCookie(document.cookie, "given_name") +
        " " +
        getValueFromCookie(document.cookie, "family_name");
      async function postComment() {
        await axios
          .post("http://localhost:5000/post_comment", {
            blog_id,
            comment_content,
            likes,
            author: comment_author,
            jti: jti,
          })
          .then((r) => console.log("Comment Posted"))
          .catch((e) => console.log("Failed to post comment: " + e.message));

        setCmntTxt("");
        // Update refreshId to trigger useEffect
        setRefreshId(`refresh_${Date.now()}`);
      }
      postComment();
    }
  };

  const handleUpdateComment = async (commentId, updatedContent) => {
    try {
      await axios.put(`http://localhost:5000/update_comment/${commentId}`, {
        comment_content: updatedContent,
      });
      setRefreshId(`refresh_${Date.now()}`); // Refresh comments after updating
    } catch (e) {
      console.log("Failed to update comment: " + e.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios
        .delete(`http://localhost:5000/delete_comment/${commentId}`)
        .then(() => console.log("Comment Deleted!"))
        .catch((e) => console.log("Error in comment deleted: " + e));

      setRefreshId(`refresh_${Date.now()}`); // Refresh comments after updating
    } catch (e) {
      console.log("Failed to update comment: " + e.message);
    }
  };

  const dateDay =
    new Date(date).getDate() +
    "/ " +
    new Date(date).getMonth() +
    "/ " +
    new Date(date).getFullYear();

  return (
    <>
      <Header />
      <Banner />
      <BoxContainer>
        <BlogTitle>{title}</BlogTitle>
        <DateAuthorHolder>
          <BlogDate>{dateDay}</BlogDate>
          <BlogAuthor>By {author}</BlogAuthor>
        </DateAuthorHolder>
        {/* <ReadLikeHolder>
          <BlogAuthor>
            <AiTwotoneLike /> {likes}
          </BlogAuthor>
        </ReadLikeHolder> */}
        <BlogContent>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </BlogContent>
        <CommentTitle>Comments</CommentTitle>
        <CommentBoxContainer>
          <TextField
            fullWidth
            label="Make a comment"
            name="title"
            margin="normal"
            value={cmntTxt}
            onChange={(e) => setCmntTxt(e.target.value)}
            style={{ marginRight: "20px", height: "40px", marginTop: "0px" }}
            required
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            style={{ height: "55px", marginTop: "5px" }}
          >
            Post
          </Button>
        </CommentBoxContainer>
        {comment
          .slice()
          .reverse()
          .map((cmnt, i) => (
            <CommentCard
              key={i}
              author={cmnt.author}
              date={cmnt.createdAt}
              content={cmnt.comment_content}
              likes={cmnt.like}
              jti={cmnt.jti}
              onUpdateComment={(updatedContent) =>
                handleUpdateComment(cmnt._id, updatedContent)
              }
              onDeleteComment={() => handleDeleteComment(cmnt._id)}
            />
          ))}
      </BoxContainer>
    </>
  );
};

export default Blog;
