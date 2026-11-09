function Pagination({ page, total, limit, onPageChange }) {
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return (
        <nav aria-label="Pagination" style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "12px" }}>
            <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
                Previous
            </button>
            <span>
                Page {page} of {totalPages} ({total} total)
            </span>
            <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
                Next
            </button>
        </nav>
    );
}

export default Pagination;