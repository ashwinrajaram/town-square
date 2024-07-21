import { useEffect, useState } from "react";

import { CircularProgress, Stack, Typography } from "@mui/material";
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useQuery } from '@apollo/client';

import { GET_POSTS } from "../apollo/queries";


import Post from "./Post";

const PostList = ({ posts }) => {

    const { loading, error, data } = useQuery(GET_POSTS);
    const [postList, setPostList] = useState([]);
    const sensors = useSensors(
        useSensor(PointerSensor)
    );



    useEffect(() => {

        // console.log(data);
        if (data && data.posts) {
            console.log(data.posts);
            setPostList(data.posts)
        }
    }, [data])



    const handleDragEnd = (event) => {
        const { active, over } = event;
        console.log(active);
        console.log(over);

        if (active.id !== over.id) {
            setPostList((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                console.log(oldIndex, newIndex);

                return arrayMove(items, oldIndex, newIndex);
            });
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