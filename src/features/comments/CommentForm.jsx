import { useState } from "react";
import useMutation from "../../shared/hooks/useMutation";

const MAX = 2000;

function CommentForm({ url, initialText = '', submitLabel, onSubmit, clearOnSuccess = false }) {
    const [text, setText] = useState(initialText);
    const { mutate, isLoading: isSaving, error } = useMutation();

    const trimmed = text.trim();
    const canSubmit = trimmed.length > 0 && trimmed !== initialText && !isSaving;

    async function handleSubmit(event) {
        event.preventDefault();
        if (!canSubmit) return;

        const result = await mutate('post', url, { text: trimmed });

        if (!result.ok) return;
        onSubmit();
        if (clearOnSuccess) setText('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "12px" }}>
            <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                maxLength={MAX}
                rows={3}
                placeholder="Write a comment..."
                style={{ display: "block", width: "100%", boxSizing: "border-box" }}
            />

            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
                <button type="submit" disabled={!canSubmit}>
                    {isSaving ? 'Saving...' : submitLabel}
                </button>

                <span style={{ color: "#666", fontSize: "0.85rem" }}>
                    {text.length}/{MAX}
                </span>
            </div>

            {/* A form error is shown directly: ErrorState hides messages for 4xx. */}
            {error && (
                <p role="alert" style={{ color: "red", margin: "4px 0 0" }}>
                    {error.message}
                </p>
            )}
        </form>
    )
}

export default CommentForm;