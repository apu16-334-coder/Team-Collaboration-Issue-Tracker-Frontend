// src/features/comments/CommentItem.jsx
import formatDate from "../../shared/utils/formatDate";

function CommentItem({ comment }) {
    return (
        <li style={{ padding: "12px 0", borderBottom: "1px solid #ddd" }}>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
                <strong style={{ color: "#000" }}>{comment.author?.name ?? "Unknown user"}</strong>
                {" · "}
                {formatDate(comment.createdAt)}
                {comment.isEdited && " · edited"}
            </div>
            {/* pre-wrap keeps the author's line breaks */}
            <p style={{ margin: "6px 0 0", whiteSpace: "pre-wrap" }}>{comment.text}</p>
        </li>
    );
}

export default CommentItem;