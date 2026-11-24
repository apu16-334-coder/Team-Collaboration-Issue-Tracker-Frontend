import { useState } from "react";

const MAX = 2000;

function CommentForm({ initialText = '', submitLabel, onSubmit, onCancel, clearOnSuccess = false }) {
    const [text, setText] = useState(initialText);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const trimmed = text.trim();
    const canSubmit = trimmed.length > 0 && trimmed !== initialText.trim() && !isSaving;

    async function handleSubmit(event) {
        event.preventDefault();
        if (!canSubmit) return;

        setIsSaving(true);
        setError(null);
        const result = await onSubmit(trimmed);
        setIsSaving(false);
        
        if (result.ok) { if (clearOnSuccess) setText(''); }
        else setError(result.error)
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

                {onCancel &&
                    <button type="button" onClick={onCancel} disabled={isSaving}>
                        Cancel
                    </button>
                }

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