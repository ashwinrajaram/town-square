import React, { useEffect, useState, useMemo, useCallback } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useQuery, useMutation } from '@apollo/client';

import { GET_POSTS } from "../apollo/queries";
import { UPDATE_POST_ORDERS } from "../apollo/mutations";

import Post from "./Post";

const PostList = () => {
    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        variables: { skip: 0, take: 10 }
    });
    const [updatePostOrders] = useMutation(UPDATE_POST_ORDERS);
    const [postList, setPostList] = useState([]);
    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        console.log(data);
        if (data?.posts) {
            setPostList(data.posts.posts);
        }
    }, [data]);

    const sortableItems = useMemo(() => postList.map(p => p.id), [postList]);

    const handleDragEnd = useCallback(async (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = postList.findIndex(item => item.id === active.id);
            const newIndex = postList.findIndex(item => item.id === over.id);

            const updatedItems = arrayMove(postList, oldIndex, newIndex)
                .map((item, index) => ({ ...item, order: index + 1 }));

            // Immediately update UI for responsiveness
            setPostList(updatedItems);

            const newOrderData = updatedItems.map(({ id, order }) => ({ id, order }));

            try {
                await updatePostOrders({
                    variables: { postOrders: newOrderData },
                    optimisticResponse: {
                        updatePostOrders: updatedItems
                    },
                    update: (cache) => {
                        cache.writeQuery({
                            query: GET_POSTS,
                            data: { posts: updatedItems },
                        });
                    },
                });
            } catch (error) {
                console.error("Failed to update post orders:", error);
                // Revert to original order if there's an error
                await refetch();
            }
        }
    }, [postList, updatePostOrders, refetch]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <h1>List of Posts</h1>
            <Stack>
                <SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
                    {postList.map((post) => (
                        <Post
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            order={post.order}
                            content={post.content}
                        />
                    ))}
                </SortableContext>
            </Stack>
        </DndContext>
    );
};

export default PostList;
