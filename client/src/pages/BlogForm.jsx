import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  styled,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import Header from "../components/Header";
import { getValueFromCookie } from "../utils/utility";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [authorS, setAuthorS] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null); // New state for editing

  useEffect(() => {
    if (jti) {
      console.log("It's authenticated");
    } else {
      navigate("/login"); // Adjust this path as needed
    }

    const author = `${getValueFromCookie(
      document.cookie,
      "given_name"
    )} ${getValueFromCookie(document.cookie, "family_name")}`;
    setAuthorS(author);
    console.log("authorS:" + authorS);

    // Fetch blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/posts/author/${authorS}`
        );
        setBlogs(resp.data);
        console.log(JSON.stringify(resp.data));
      } catch (err) {
        console.error(
          "Error fetching blogs:",
          err.response?.data || err.message
        );
      }
    };

    fetchBlogs();
  }, [jti, navigate, authorS]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (title === "" || content === "") {
      alert("Please write title and content to save the blog!");
      setIsSubmitting(false);
      return;
    }

    const author = `${getValueFromCookie(
      document.cookie,
      "given_name"
    )} ${getValueFromCookie(document.cookie, "family_name")}`;
    const likes = 0;
    const postData = { title, author, content, likes, jti };

    try {
      if (editingBlogId) {
        // Update existing blog
        await axios.put(
          `http://localhost:5000/post/${editingBlogId}`,
          postData
        );
        alert("Blog updated successfully");
        // Update the blog list
        setBlogs(
          blogs.map((blog) =>
            blog._id === editingBlogId ? { ...blog, title, content } : blog
          )
        );
      } else {
        // Create new blog
        await axios.post("http://localhost:5000/post", postData);
        alert("Blog uploaded successfully");
        // Add the new blog to the list
        setBlogs([...blogs, { ...postData, _id: Date.now().toString() }]); // Temporary ID for local use
      }

      // Reset the form fields
      setTitle("");
      setContent("");
      setEditingBlogId(null); // Reset editing state
    } catch (err) {
      console.error(
        "Problem in blog submission",
        err.response?.data || err.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    // Prefill the form with the blog data for editing
    setTitle(blog.title);
    setContent(blog.content);
    setEditingBlogId(blog._id);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/delete_blog/${blogId}`);
        alert("Blog deleted successfully");
        // Update the blog list after deletion
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } catch (err) {
        console.error(
          "Error deleting blog:",
          err.response?.data || err.message
        );
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <FormTitle>
          {editingBlogId ? "Edit Blog Post" : "Create a New Blog Post"}
        </FormTitle>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Blog Title"
            name="title"
            value={title} // Bind value to state
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Blog Content
          </Typography>
          <ReactQuill
            theme="snow"
            value={content} // Bind value to state
            onChange={setContent}
            style={{ marginBottom: "20px", height: "300px" }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "30px", width: "100%" }}
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting
              ? "Submitting..."
              : editingBlogId
              ? "Update"
              : "Submit"}
          </Button>
        </form>

        <Typography variant="h6" style={{ marginTop: "40px" }}>
          Your Blogs
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(blog)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(blog._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default BlogForm;
