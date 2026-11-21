import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { VISIBLE_ISSUE_STATUSES, ISSUE_STATUSES, ISSUE_PRIORITIES, ISSUE_TYPES } from './issueOptions';
import { isMember } from "../auth/permissions";

function IssueFilter({ applied, onApply, onReset }) {
    const { user } = useContext(AuthContext);

    const [draft, setDraft] = useState({
        search: applied.search ?? "",
        status: applied.status ?? "",
        priority: applied.priority ?? '',
        type: applied.type ?? '',
    })

    const statuses = isMember(user) ? VISIBLE_ISSUE_STATUSES : ISSUE_STATUSES

    function handleChange(event) {
        const { name, value } = event.target
        setDraft(prev => ({ ...prev, [name]: value }))
    }

    function handleChangeAssignedTo(event) {
        onApply({ assignedTo: event.target.checked ? user.id : '', });
    }

    function handleSubmit(event) {
        event.preventDefault();
        onApply({
            search: draft.search.trim(),
            status: draft.status,
            priority: draft.priority,
            type: draft.type,
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap", alignItems: "center" }}
        >
            <input
                name="search"
                type="search"
                placeholder="Search title or description"
                value={draft.search}
                onChange={handleChange}
            />

            <select name="status" value={draft.status} onChange={handleChange}>
                <option value="">All statuses</option>
                {statuses.map((status) => (
                    <option key={status} value={status}>
                        {status.replace("_", " ")}
                    </option>
                ))}
            </select>

            <select name="priority" value={draft.priority} onChange={handleChange}>
                <option value="">All priorities</option>
                {ISSUE_PRIORITIES.map((priority) => (
                    <option key={priority} value={priority}>
                        {priority}
                    </option>
                ))}
            </select>

            <select name="type" value={draft.type} onChange={handleChange}>
                <option value="">All types</option>
                {ISSUE_TYPES.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <button type="submit">Search</button>
            <button type="button" onClick={onReset}>
                Reset
            </button>

            {isMember(user) && (
                <label style={{ marginLeft: "8px" }}>
                    <input
                        name="assignedTo"
                        type="checkbox"
                        checked={applied.assignedTo === user.id}
                        onChange={handleChangeAssignedTo}
                    />{" "}
                    Assigned to me
                </label>
            )}
        </form>
    )
}

export default IssueFilter;