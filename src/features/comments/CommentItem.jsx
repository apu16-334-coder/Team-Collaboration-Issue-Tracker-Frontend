// src/features/comments/CommentItem.jsx
import { useContext, useState } from "react";
import formatDate from "../../shared/utils/formatDate";
import { AuthContext } from "../auth/AuthContext";
import { can } from "../auth/permissions";
import CommentForm from "./CommentForm";

function CommentItem({ comment, onChange, onDelete }) {
    const { user } = useContext(AuthContext);

    const [isEditing, setIsEdititng] = useState(false);

    function handleEdit() {
        setIsEdititng(false);
        onChange();
    }

    return (
        <li style={{ padding: "12px 0", borderBottom: "1px solid #ddd" }}>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
                <strong style={{ color: "#000" }}>{comment.author?.name ?? "Unknown user"}</strong>
                {" · "}
                {formatDate(comment.createdAt)}
                {comment.isEdited && " · edited"}
            </div>


            {isEditing ?
                (
                    <CommentForm
                        method={'patch'}
                        url={`/issues/${comment.issue.id}/comments/${comment.id}`}
                        initialText={comment.text}
                        submitLabel="Save"
                        onSubmit={handleEdit}
                        onCancel={() => setIsEdititng(false)}
                    />
                ) : (

                    <>
                        {/* pre-wrap keeps the author's line breaks */}
                        < p style={{ margin: "6px 0 0", whiteSpace: "pre-wrap" }}>{comment.text}</p>

                        {/* Author-only: a relationship rule, so can.* needs the comment too. */}
                        <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                            {can.editComment(user, comment) && <button onClick={() => setIsEdititng(true)}>edit</button>}
                        </div>
                    </>
                )
            }


        </li >
    );
}

export default CommentItem;