import { Box, Divider, styled, Typography } from "@mui/material";
import { AiTwotoneLike } from "react-icons/ai";

const BoxComponent = styled(Box)
`
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
`;

const CommentDate = styled(Typography)`
        margin-left: 20px;
        font-size: 12px;
        font-family: 'Montserrat', sans-serif;
`;

const BlogLikes = styled(Typography)`
        font-size: 13px;
        font-family: 'Montserrat', sans-serif;
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

const CommentCard = ({author, date, content, likes}) => {
        const dateDay =
        new Date(date).getDate() +
        "/ " +
        new Date(date).getMonth() +
        "/ " +
        new Date(date).getFullYear();
        console.log("FROM: ", author);
        return (
                <BoxComponent>
                        <ContentHolder>
                                <DateAuthorHolder>
                                        <CommentAuthor>{author}</CommentAuthor>      
                                        <CommentDate>{dateDay}</CommentDate>
                                </DateAuthorHolder>
                                <BlogContent>{content}</BlogContent>
                                <ReadLikeHolder>
                                        <BlogLikes><AiTwotoneLike /> {likes}</BlogLikes>
                                </ReadLikeHolder>
                                <Divider></Divider>
                        </ContentHolder>
                </BoxComponent>
        );
}

export default CommentCard;


