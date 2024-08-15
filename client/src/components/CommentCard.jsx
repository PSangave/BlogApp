import { Box, Divider, styled, Typography } from "@mui/material";
import { CiRead } from "react-icons/ci";
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

const Card = () => {
        return (
                <BoxComponent>
                        <ContentHolder>
                                <DateAuthorHolder>
                                        <CommentAuthor>By Pranav Sangave</CommentAuthor>      
                                        <CommentDate>02/28</CommentDate>
                                </DateAuthorHolder>
                                <BlogContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis totam officia fugiat nihil. Aliquam eveniet nulla reprehenderit eius delectus accusamus aut libero corrupti! Esse a rerum nisi similique, iure aut!</BlogContent>
                                <ReadLikeHolder>
                                        <BlogLikes><AiTwotoneLike /> 100</BlogLikes>
                                </ReadLikeHolder>
                                <Divider></Divider>
                        </ContentHolder>
                </BoxComponent>
        );
}

export default Card;


