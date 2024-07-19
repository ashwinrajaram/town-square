import { Paper } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";


const Post = ({ id, title, description, order }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
    } = useSortable({ id });
    return (
        <Paper elevation={3} className="mt-2" ref={setNodeRef} {...attributes} {...listeners}>
            <h2>{order}. {title}</h2>
            <p>{description}</p>
        </Paper>)
};

export default Post;
