import { useContext, useState } from "react"
import { PROJECT_STATUSES, VISIBLE_PROJECT_STATUSES } from './projectOptions.js'
import { isAdmin } from "../auth/permissions.js";
import { AuthContext } from "../auth/AuthContext.jsx";
import CheckBoxGroup from "../../shared/ui/CheckBoxGroup.jsx";

const toArray = (value) =>
    Array.isArray(value) ? value : value ? String(value).split(',') : [];

function ProjectFilters({ applied, onApply, onReset }) {
    const { user } = useContext(AuthContext);

    const statuses = isAdmin(user) ? PROJECT_STATUSES : VISIBLE_PROJECT_STATUSES;

    const [draft, setDraft] = useState({
        search: applied.search ?? "",
        status: toArray(applied.status),
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setDraft(prev => ({ ...prev, [name]: value }))
    }

    function handleChangeCheckBoxGroup(name, next) {
        setDraft(prev => ({ ...prev, [name]: next }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onApply({
            search: draft.search.trim(),
            status: draft.status.join(',')
        });
    }

    // Structure helpers (Tailwind can replace these later)
    const filterRow = { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" };
    const actionRow = { display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginBottom: "12px" };

    return (
        <form onSubmit={handleSubmit}>
            {/* ── Filter Groups (Top) ── */}
            <div style={{ marginBottom: "12px" }}>
                {/* Status */}
                <div style={filterRow}>
                    <div style={{ minWidth: "60px" }}>Status:</div>
                    <CheckBoxGroup
                        name="status"
                        options={statuses}
                        selected={draft.status}
                        onChange={handleChangeCheckBoxGroup}
                    />
                </div>
            </ div>

            {/* ── Search & Actions (Bottom) ── */}
            <div style={actionRow}>
                <input
                    name="search"
                    type="search"
                    placeholder="Search title or description"
                    value={draft.search}
                    onChange={handleChange}
                    size={30}
                />

                <button type="submit">Search</button>
                <button type="button" onClick={onReset}>Reset</button>
            </div>
        </form>
    )
}

export default ProjectFilters;