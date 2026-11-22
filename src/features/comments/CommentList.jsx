// src/features/comments/CommentList.jsx
import CommentItem from "./CommentItem";

function CommentList({ comments = [] }) {
    return (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </ul>
    );
}

export default CommentList;