const TITLES = {
    403: "You don't have access to this",
    404: "Not available",
};

// Retrying only helps when the cause may be temporary:
// no status (network), a server error, or rate limiting. Other 4xx answers won't change.
const isRetryable = (status) => !status || status >= 500 || status === 429;

function ErrorState({ error, onRetry, action }) {
    return (
        <div role="alert">
            {TITLES[error.status] && <h3>{TITLES[error.status]}</h3>}
            <p style={{ color: "red" }}>{error.message}</p>
            {onRetry && isRetryable(error.status) && <button onClick={onRetry}>Retry</button>}
            {action}
        </div>
    );
}

export default ErrorState;