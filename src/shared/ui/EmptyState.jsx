function EmptyState({ title, message, action }) {
    return (
        <div style={{ padding: "1rem", textAlign: "center" }}>
            <h3>{title}</h3>
            {message && <p>{message}</p>}
            {action && <div>{action}</div>}
        </div>
    )
}

export default EmptyState;