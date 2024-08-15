import { useState } from 'react';
import { Box, Button, TextField, styled, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import Header from '../components/Header';

const Container = styled(Box)`
  width: 50%;
  margin: auto;
  padding: 50px;
`;

const FormTitle = styled(Typography)`
  font-size: 30px;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 20px;
`;


const BlogForm = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    author: '',
    date: '',
    content: '',
  });

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (content) => {
    setBlogData({
      ...blogData,
      content,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogData);
    // Add your logic to save the blog data (e.g., send it to your backend or update the state)
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
            value={blogData.title}
            onChange={handleChange}
            margin="normal"
          />
          
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Blog Content
          </Typography>
          <ReactQuill
            theme="snow"
            value={blogData.content}
            onChange={handleContentChange}
            style={{ marginBottom: '20px', height: '300px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '30px', width: "100%" }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default BlogForm;
