import { Box, Divider, styled, Typography, TextField, Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { getValueFromCookie } from "../utils/utility";

const BoxComponent = styled(Box)`
  height: auto;
  display: flex;
  justify-content: center;
`;

const ContentHolder = styled(Box)`
  width: 100%;
  height: auto;
  padding: 20px 30px;
  border-radius: 4px;
`;

const DateAuthorHolder = styled(Box)`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;

const CommentAuthor = styled(Typography)`
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
`;

const CommentDate = styled(Typography)`
  margin-left: 20px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
`;

const BlogEdit = styled(Typography)`
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
`;

const BlogDelete = styled(Typography)`
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
  margin-left: 5px;
  cursor: pointer;
`;

const BlogContent = styled(Typography)`
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
  margin: 0px 0px 10px 0px;
`;

const ReadLikeHolder = styled(Box)`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;

const CommentCard = ({ author, date, content, likes, jti, onUpdateComment, onDeleteComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const comment_author_from_cookie =
        getValueFromCookie(document.cookie, "given_name") +
        " " +
        getValueFromCookie(document.cookie, "family_name");

  console.log("comment_author_from_cookie: " + comment_author_from_cookie);
  console.log("author: " + author);
  
  
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdateComment(editedContent); // Call the update function passed as a prop
    setIsEditing(false);
  };

  const handlDeleteClick = () => {
        onDeleteComment();
  }

  const dateDay =
    new Date(date).getDate() +
    "/ " +
    new Date(date).getMonth() +
    "/ " +
    new Date(date).getFullYear();

  return (
    <BoxComponent>
      <ContentHolder>
        <DateAuthorHolder>
          <CommentAuthor>{author}</CommentAuthor>
          <CommentDate>{dateDay}</CommentDate>
        </DateAuthorHolder>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <Button onClick={handleSaveClick}>Save</Button>
          </>
        ) : (
          <BlogContent>{content}</BlogContent>
        )}
        {
          (comment_author_from_cookie === author) ? 
          (<ReadLikeHolder>
            <BlogEdit onClick={handleEditClick}>
              <FaEdit />
            </BlogEdit>
            <BlogDelete onClick={handlDeleteClick}>
              <MdDelete />
            </BlogDelete>
          </ReadLikeHolder>) :
          (<></>)
        }
        <Divider />
      </ContentHolder>
    </BoxComponent>
  );
};

export default CommentCard;
