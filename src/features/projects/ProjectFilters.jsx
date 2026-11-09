import { useState } from "react"
import { PROJECT_STATUSES } from './projectOptions.js'

function ProjectFilters({ applied, onApply, onReset }) {
    const [draft, setDraft] = useState({
        search: applied.search ?? "",
        status: applied.status ?? "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setDraft(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault();
        onApply({ search: draft.search.trim(), status: draft.status });
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <input
                name="search"
                type="search"
                placeholder="Search title or description"
                value={draft.search}
                onChange={handleChange}
            />

            <select name="status" value={draft.status} onChange={handleChange}>
                <option value="">All statuses</option>
                {PROJECT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                        {status.replace("_", " ")}
                    </option>
                ))}
            </select>

            <button type="submit">Search</button>
            <button type="button" onClick={onReset}>
                Reset
            </button>
        </form>
    )
}

export default ProjectFilters;