import { Paper, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Post = ({ id, title, content, order }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });
    return (
        <Paper elevation={3} className="mt-5 p-5 text-left"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ transform: CSS.Translate.toString(transform), transition }}
        >
            <div>
                <p className="bg-teal-500 rounded text-white p-4  m-2 inline">{order}</p>
                <Typography variant="h6" className="inline" >{title}</Typography>
            </div>

            <p className="mt-2">{content}</p>
        </Paper>)
};

export default Post;
