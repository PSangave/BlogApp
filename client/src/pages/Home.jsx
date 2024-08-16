import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import BlogCardContainer from "../components/BlogCardContainer";
import Header from "../components/Header";
import { getValueFromCookie } from "../utils/utility";
import { useEffect } from "react";


const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const jti = getValueFromCookie(document.cookie, "jti");

  useEffect(() => {
    if (jti) {
      // Redirect to another page if token exists
    } else {
      console.log("No token found");
      navigate("/login"); // Adjust this path as needed
    }
  }, [jti, navigate]);

  return (
    <>
      <Header />
      <Banner />
      <BlogCardContainer />
    </>
  );
};

export default Home;
