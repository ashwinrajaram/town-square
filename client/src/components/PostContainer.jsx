import React, { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from '@apollo/client';
import { GET_POSTS } from "../apollo/queries";
import PostList from "./PostList";
import Pagination from "./Pagination";

const POSTS_PER_PAGE = 10;

const PostContainer = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [postList, setPostList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        variables: { skip: currentPage * POSTS_PER_PAGE, take: POSTS_PER_PAGE }
    });

    useEffect(() => {
        if (data?.posts) {
            setPostList(data.posts.posts);
            setTotalCount(data.posts.totalCount);
        }
    }, [data]);

    useEffect(() => {
        refetch({ skip: currentPage * POSTS_PER_PAGE, take: POSTS_PER_PAGE });
    }, [currentPage, refetch]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    return (
        <>
            <h1>List of Posts</h1>
            <PostList
                postList={postList}
                setPostList={setPostList}
                currentPage={currentPage}
                totalCount={totalCount}
                refetch={refetch}
            />
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalCount={totalCount}
                postsPerPage={POSTS_PER_PAGE}
            />
        </>
    );
};

export default PostContainer;
