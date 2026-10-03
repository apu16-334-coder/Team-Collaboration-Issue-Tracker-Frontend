function ErrorState({ message, onRetry }) {
    return (
        <div style={{ padding: "1rem", textAlign: "center" }}>
            <p>{message}</p>
            {onRetry && <button onClick={onRetry}>Retry</button>}
        </div>
    )
}

export default ErrorState;