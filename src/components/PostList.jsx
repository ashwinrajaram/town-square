import { List, ListItem, Paper, Stack } from "@mui/material";
import Post from "./Post";

const PostList = ({ posts }) => {
    return (
        <>
            <h1>List of Posts</h1>
            <Stack >

                {posts.map((post, index) => (
                    <Post
                        key={post.id}
                        title={post.title}
                        description={post.description}
                        order={index + 1}
                    />
                ))}

            </Stack>
        </>

    );
};

export default PostList