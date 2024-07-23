import React, { useState, useEffect, useCallback } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from '@apollo/client';
import { GET_POSTS } from "../apollo/queries";
import PostList from "./PostList";
import Pagination from "./Pagination";

const POSTS_PER_PAGE = 10;
const QUERY_TIMEOUT = 10000; // 10 seconds timeout

const PostContainer = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [postList, setPostList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [timeoutError, setTimeoutError] = useState(null);

    const handleQueryError = useCallback((error) => {
        console.error('Query error:', error);
        setTimeoutError('Request timed out. Please try again.');
    }, []);

    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        variables: { skip: currentPage * POSTS_PER_PAGE, take: POSTS_PER_PAGE },
        fetchPolicy: 'network-only',
        onError: handleQueryError,
    });

    useEffect(() => {
        if (data?.posts) {
            setPostList(data.posts.posts);
            setTotalCount(data.posts.totalCount);
            setTimeoutError(null);
        }
    }, [data]);

    useEffect(() => {
        let timeoutId;
        if (loading) {
            timeoutId = setTimeout(() => {
                handleQueryError(new Error('Request timed out'));
            }, QUERY_TIMEOUT);
        }
        return () => clearTimeout(timeoutId);
    }, [loading, handleQueryError]);

    useEffect(() => {
        refetch({ skip: currentPage * POSTS_PER_PAGE, take: POSTS_PER_PAGE });
    }, [currentPage, refetch]);


    if (loading && !timeoutError) return <CircularProgress />;
    if (error || timeoutError) {
        return (
            <div>
                <Typography color="error">Error: {error?.message || timeoutError}</Typography>
            </div>
        );
    }

    return (
        <>
            <h1>Post Lists</h1>
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
