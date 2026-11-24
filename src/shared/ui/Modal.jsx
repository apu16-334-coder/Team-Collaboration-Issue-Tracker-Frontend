// src/shared/ui/Modal.jsx
// Structure only. Stage 3 swaps this for shadcn's <Dialog>.
function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                style={{ background: "#fff", padding: "24px", minWidth: "320px", borderRadius: "4px" }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <h2 style={{ margin: 0 }}>{title}</h2>
                    <button onClick={onClose}>×</button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;