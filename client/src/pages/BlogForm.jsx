import { useEffect, useState } from "react";
import { Box, Button, TextField, styled, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import Header from "../components/Header";
import { getValueFromCookie } from "../utils/utility";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  width: 50%;
  margin: auto;
  padding: 50px;
`;

const FormTitle = styled(Typography)`
  font-size: 30px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 20px;
`;

const BlogForm = () => {

  const navigate = useNavigate(); // Initialize useNavigate hook
  const jti = getValueFromCookie(document.cookie, "jti");

  useEffect(() => {
    if (jti) {
      // Redirect to another page if token exists
      console.log("Yetoe jti BlogFrom madhe!");
    } else {
      console.log("No token found");
      navigate("/login"); // Adjust this path as needed
    }
  }, [jti, navigate]);


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Optional: Disable submit button during submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const author =
      getValueFromCookie(document.cookie, "given_name") +
      " " +
      getValueFromCookie(document.cookie, "family_name");

    const likes = 0;
    const postData = { title, author, content, likes, jti };

    try {
      await axios.post("http://localhost:5000/post", postData);
      console.log("Blog Uploaded!");

      // Reset the form fields
      setTitle('');
      setContent('');

      alert("Blog Uploaded Successfully...");
      
    } catch (err) {
      console.error("Problem in blog upload ", err.response?.data || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <FormTitle>Create a New Blog Post</FormTitle>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Blog Title"
            name="title"
            value={title}  // Bind value to state
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Blog Content
          </Typography>
          <ReactQuill
            theme="snow"
            value={content}  // Bind value to state
            onChange={setContent}
            style={{ marginBottom: "20px", height: "300px" }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "30px", width: "100%" }}
            disabled={isSubmitting}  // Disable button while submitting
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Container>
    </>
  );
};

export default BlogForm;
