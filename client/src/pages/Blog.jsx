import { Box, styled, Typography } from "@mui/material";
import Banner from "../components/Banner";
import Header from "../components/Header";
import CommentCard from "../components/CommentCard";
import { CiRead } from "react-icons/ci";
import { AiTwotoneLike } from "react-icons/ai";


const BoxContainer = styled(Box)
`
        width: 70%;
        margin: auto;
        padding: 50px
`;

const BlogTitle = styled(Typography)`
        font-size: 60px;
        font-family: 'Montserrat', sans-serif;
`;

const CommentTitle = styled(Typography)`
        font-size: 30px;
        font-family: 'Montserrat', sans-serif;
`;

const DateAuthorHolder = styled(Box)`
        width: 100%;
        display: flex;
        margin-left: 5px;
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
        margin: 40px 0px 10px 5px;
`;

const ReadLikeHolder = styled(Box)`
        width: 100%;
        display: flex;
        margin: 10px 0px;
        margin-left: 5px;
`;

const Blog = () => {
        return (
                <>
                        <Header/>
                        <Banner/>
                        <BoxContainer>
                                <BlogTitle>Blog Title</BlogTitle>
                                <DateAuthorHolder>
                                        <BlogDate>02/28</BlogDate>
                                        <BlogAuthor>By Pranav Sangave</BlogAuthor>
                                </DateAuthorHolder>
                                <ReadLikeHolder>
                                        <BlogDate><CiRead /> 200</BlogDate>
                                        <BlogAuthor><AiTwotoneLike /> 100</BlogAuthor>
                                </ReadLikeHolder>
                                <BlogContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis totam officia fugiat nihil. Aliquam eveniet nulla reprehenderit eius delectus accusamus aut libero corrupti! Esse a rerum nisi similique, iure aut!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis totam officia fugiat nihil. Aliquam eveniet nulla reprehenderit eius delectus accusamus aut libero corrupti! Esse a rerum nisi similique, iure aut! 
                                <br /><br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis totam officia fugiat nihil. Aliquam eveniet nulla reprehenderit eius delectus accusamus aut libero corrupti! Esse a rerum nisi similique, iure aut! 
                                <br /><br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis totam officia fugiat nihil. Aliquam eveniet nulla reprehenderit eius delectus accusamus aut libero corrupti! Esse a rerum nisi similique, iure aut! Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis totam officia fugiat nihil. Aliquam eveniet nulla reprehenderit eius delectus accusamus aut libero corrupti! Esse a rerum nisi similique, iure aut!
                                <br /><br />
                                </BlogContent>
                                <CommentTitle>Comments</CommentTitle>
                                <CommentCard></CommentCard>
                                <CommentCard></CommentCard>
                        </BoxContainer>
                </>
        );
}

export default Blog;