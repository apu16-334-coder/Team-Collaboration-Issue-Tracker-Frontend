function Spinner({ label = 'Loading...' }) {
    return (
        <div style={{ padding: "1rem" }}>
            {label}
        </div>
    )
}

export default Spinner;