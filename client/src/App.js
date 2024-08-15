import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Blog from "./pages/Blog";
import BlogForm from "./pages/BlogForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/create" element={<BlogForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
