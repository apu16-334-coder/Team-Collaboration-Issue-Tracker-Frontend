// src/features/comments/CommentList.jsx
import CommentItem from "./CommentItem";

function CommentList({ comments = [], onChange, onDelete }) {
    return (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onChange={onChange}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default CommentList;