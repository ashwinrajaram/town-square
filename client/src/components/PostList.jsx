import { useEffect, useState } from "react";

import { CircularProgress, Stack, Typography } from "@mui/material";
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useQuery, useMutation } from '@apollo/client';

import { GET_POSTS } from "../apollo/queries";
import { UPDATE_POST_ORDERS } from "../apollo/mutations";


import Post from "./Post";

const PostList = () => {

    const { loading, error, data, refetch } = useQuery(GET_POSTS);
    const [updatePostOrders] = useMutation(UPDATE_POST_ORDERS);
    const [postList, setPostList] = useState([]);
    const sensors = useSensors(
        useSensor(PointerSensor)
    );


    useEffect(() => {
        if (data && data.posts) {
            console.log(data.posts);
            setPostList(data.posts)
        }
    }, [data])



    const handleDragEnd = async (event) => {
        const { active, over } = event;
        console.log(active);
        console.log(over);

        if (active.id !== over.id) {


            const oldIndex = postList.findIndex((item) => item.id === active.id);
            const newIndex = postList.findIndex((item) => item.id === over.id);


            const movedArray = arrayMove(postList, oldIndex, newIndex);
            const updatedItems = movedArray.map((item, i) => { return { ...item, order: i + 1 } })

            const minIndex = Math.min(oldIndex, newIndex);
            const maxIndex = Math.max(oldIndex, newIndex);

            const newOrderData = updatedItems.slice(minIndex, maxIndex + 1).map((post) => ({
                id: post.id,
                order: post.order,
            }));
            console.log(newOrderData);

            setPostList(updatedItems);

            try {
                await updatePostOrders({
                    variables: { postOrders: newOrderData },
                }
                );
                await refetch();
            } catch (error) {
                console.error("Failed to update post orders:", error);
                await refetch();
            }
        }



    };

    if (loading) {
        return <CircularProgress />
    }
    if (error) {
        return <Typography color="error">Error: {error.message}</Typography>
    }
    return (
        <>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <h1>List of Posts</h1>
                <Stack >
                    <SortableContext items={postList.map(p => p.id)} strategy={verticalListSortingStrategy}>
                        {postList.map((post, index) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                desciption={post.desciption}
                                order={index + 1}
                            />
                        ))}
                    </SortableContext>
                </Stack>
            </DndContext>
        </>

    );
};

export default PostList