import { Box, styled, Typography } from "@mui/material";
import { CiRead } from "react-icons/ci";
import { AiTwotoneLike } from "react-icons/ai";

const BoxComponent = styled(Box)
`
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
        font-family: 'Montserrat', sans-serif;
        margin: 0px 0px 0px 0px;
`;

const DateAuthorHolder = styled(Box)`
        width: 100%;
        display: flex;
`;

const BlogDate = styled(Typography)`
        font-size:15px;
        font-family: 'Montserrat', sans-serif;
`;

const BlogAuthor = styled(Typography)`
        margin-left: 20px;
        font-size: 15px;
        font-family: 'Montserrat', sans-serif;
`;

const BlogContent = styled(Typography)`
        font-size: 17px;
        font-family: 'Montserrat', sans-serif;
        margin: 10px 0px 10px 0px;
`;

const ReadLikeHolder = styled(Box)`
        width: 100%;
        display: flex;
`;

const Card = () => {
        return (
                <BoxComponent>
                        <ContentHolder>
                                <BlogTitle>Blog Title</BlogTitle>
                                <DateAuthorHolder>
                                        <BlogDate>02/28</BlogDate>
                                        <BlogAuthor>By Pranav Sangave</BlogAuthor>
                                </DateAuthorHolder>
                                <BlogContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis totam officia fugiat nihil. Aliquam eveniet nulla reprehenderit eius delectus accusamus aut libero corrupti! Esse a rerum nisi similique, iure aut!</BlogContent>
                                <ReadLikeHolder>
                                        <BlogDate><CiRead /> 200</BlogDate>
                                        <BlogAuthor><AiTwotoneLike /> 100</BlogAuthor>
                                </ReadLikeHolder>
                        </ContentHolder>
                </BoxComponent>
        );
}

export default Card;


