import Modal from "./Modal";

function ConfirmDialog({ isOpen, title, message, confirmLabel, onConfirm, onCancel, isLoading, error }) {

    // Don't let the backdrop or × close the dialog while the request is running.
    const handleClose = isLoading ? () => { } : onCancel;

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={title} >
            <p>{message}</p>

            {error && (
                <p role="alert" style={{ color: "red" }}>
                    {error.message}
                </p>
            )}

            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <button type="button" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </button>
                <button type="button" onClick={onConfirm} disabled={isLoading}>
                    {isLoading ? "Working..." : confirmLabel}
                </button>
            </div>
        </ Modal>
    )
}

export default ConfirmDialog;