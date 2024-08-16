import { Box, styled, Typography } from "@mui/material";
import { AiTwotoneLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// Styled components as you have defined them
const BoxComponent = styled(Box)`
  height: auto;
  display: flex;
  justify-content: center;
`;

const ContentHolder = styled(Box)`
  width: 80%;
  height: auto;
  padding: 20px 30px;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
`;

const BlogTitle = styled(Typography)`
  font-size: 30px;
  font-family: "Montserrat", sans-serif;
  margin: 0px 0px 0px 0px;
`;

const DateAuthorHolder = styled(Box)`
  width: 100%;
  display: flex;
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

const BlogLikes = styled(Typography)`
  font-size: 15px;
  font-family: "Montserrat", sans-serif;
`;

const Content = styled(Box)`
  font-size: 17px;
  font-family: "Montserrat", sans-serif;
  margin: 10px 0px 10px 0px;
  line-height: 1.6;

  p {
    margin-bottom: 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 10px 0;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ReadLikeHolder = styled(Box)`
  width: 100%;
  display: flex;
`;

// Updated Card component with correct props destructuring
const Card = ({ key, title, date, author, content, likes }) => {
  const navigate = useNavigate();
  const dateDay =
  new Date(date).getDate() +
  "/ " +
  new Date(date).getMonth() +
  "/ " +
  new Date(date).getFullYear();
  const handleClick = () => {
    navigate(`/blog/${key}`, {
      state: { title, date, author, content, likes },
    });
  };

  const truncateContent = (content, wordLimit) => {
    const wordsArray = content.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  const wordLimit = 20; // Set your word limit here
  const truncatedContent = truncateContent(content, wordLimit);
  return (
    <BoxComponent onClick={handleClick}>
      <ContentHolder>
        <BlogTitle>{title}</BlogTitle>
        <DateAuthorHolder>
          <BlogDate>{dateDay}</BlogDate>
          <BlogAuthor>By {author}</BlogAuthor>
        </DateAuthorHolder>
        <Content dangerouslySetInnerHTML={{ __html: truncatedContent }} />
        <ReadLikeHolder>
          <BlogLikes>
            <AiTwotoneLike /> {likes}
          </BlogLikes>
        </ReadLikeHolder>
      </ContentHolder>
    </BoxComponent>
  );
};

export default Card;
