import React, { useMemo, useCallback } from "react";
import { Stack } from "@mui/material";
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useMutation } from '@apollo/client';
import { UPDATE_POST_ORDERS } from "../apollo/mutations";
import { GET_POSTS } from "../apollo/queries";
import Post from "./Post";

const POSTS_PER_PAGE = 10;

const PostList = ({ postList, setPostList, currentPage, totalCount, refetch }) => {
    const [updatePostOrders] = useMutation(UPDATE_POST_ORDERS);
    const sensors = useSensors(useSensor(PointerSensor));

    const sortableItems = useMemo(() => postList.map(p => p.id), [postList]);

    const handleDragEnd = useCallback(async (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = postList.findIndex(item => item.id === active.id);
            const newIndex = postList.findIndex(item => item.id === over.id);

            const updatedItems = arrayMove(postList, oldIndex, newIndex)
                .map((item, index) => ({ ...item, order: index + 1 }));

            setPostList(updatedItems);

            const newOrderData = updatedItems.map(({ id, order }) => ({ id, order }));

            try {
                await updatePostOrders({
                    variables: {
                        postOrders: newOrderData,
                        skip: currentPage * POSTS_PER_PAGE,
                        take: POSTS_PER_PAGE
                    },
                    optimisticResponse: {
                        updatePostOrders: {
                            __typename: "PaginatedPosts",
                            posts: updatedItems,
                            totalCount: totalCount
                        }
                    },
                    update: (cache, { data: { updatePostOrders } }) => {
                        cache.writeQuery({
                            query: GET_POSTS,
                            data: { posts: updatePostOrders },
                            variables: { skip: currentPage * POSTS_PER_PAGE, take: POSTS_PER_PAGE }
                        });
                    },
                });
            } catch (error) {
                console.error("Failed to update post orders:", error);
                await refetch();
            }
        }
    }, [postList, updatePostOrders, refetch, currentPage, totalCount, setPostList]);

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
