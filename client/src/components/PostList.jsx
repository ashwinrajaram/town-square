import { useState } from "react";

import { Stack } from "@mui/material";
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

import Post from "./Post";

const PostList = ({ posts }) => {

    const [postList, setPostList] = useState(posts);
    const sensors = useSensors(
        useSensor(PointerSensor)
    );

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