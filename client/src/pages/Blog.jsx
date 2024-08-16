import { Box, styled, Typography } from "@mui/material";
import Banner from "../components/Banner";
import Header from "../components/Header";
import CommentCard from "../components/CommentCard";
import { CiRead } from "react-icons/ci";
import { AiTwotoneLike } from "react-icons/ai";
import { useLocation } from "react-router-dom";

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

const ReadLikeHolder = styled(Box)`
  width: 100%;
  display: flex;
  margin: 10px 0px;
  margin-left: 5px;
`;

const Blog = () => {
  const location = useLocation();
  const { title, date, author, content, likes } = location.state || {};
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
        <ReadLikeHolder>
          <BlogAuthor>
            <AiTwotoneLike /> {likes}
          </BlogAuthor>
        </ReadLikeHolder>
        <BlogContent>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </BlogContent>
        <CommentTitle>Comments</CommentTitle>
        <CommentCard></CommentCard>
        <CommentCard></CommentCard>
      </BoxContainer>
    </>
  );
};

export default Blog;
