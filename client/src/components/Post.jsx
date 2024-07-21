import { Paper } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Post = ({ id, title, description, order }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });
    return (
        <Paper elevation={3} className="mt-2"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ transform: CSS.Translate.toString(transform), transition }}
        >

            <h2>{order}. {title}</h2>
            <p>{description}</p>
        </Paper>)
};

export default Post;
