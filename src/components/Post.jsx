import { Paper } from "@mui/material";


const Post = ({ title, description, order }) => (
    <Paper elevation={3} >
        <h2>{order}. {title}</h2>
        <p>{description}</p>
    </Paper>
);

export default Post;
