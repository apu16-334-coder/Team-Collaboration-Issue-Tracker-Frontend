import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { VISIBLE_ISSUE_STATUSES, ISSUE_STATUSES, ISSUE_PRIORITIES, ISSUE_TYPES } from './issueOptions';
import { isMember } from "../auth/permissions";
import CheckBoxGroup from "../../shared/ui/CheckBoxGroup";

const toArray = (value) =>
    Array.isArray(value) ? value : value ? String(value).split(',') : [];

function IssueFilter({ applied, onApply, onReset, teamMembers }) {
    const { user } = useContext(AuthContext);

    const [draft, setDraft] = useState({
        search: applied.search ?? "",
        status: toArray(applied.status),
        priority: toArray(applied.priority),
        type: toArray(applied.type),
        assignedTo: applied.assignedTo ?? '',
    });

    const statusOptions = isMember(user) ? VISIBLE_ISSUE_STATUSES : ISSUE_STATUSES;

    function handleChange(event) {
        const { name, value } = event.target;
        setDraft(prev => ({ ...prev, [name]: value }));
    }

    function handleChangeCheckBoxGroup(name, next) {
        setDraft(prev => ({ ...prev, [name]: next }));
    }

    function handleChangeAssignedTo(event) {
        onApply({ assignedTo: event.target.checked ? user.id : '' });
    }

    function handleSubmit(event) {
        event.preventDefault();
        onApply({
            search: draft.search.trim(),
            status: draft.status.join(','),
            priority: draft.priority.join(','),
            type: draft.type.join(','),
            assignedTo: draft.assignedTo,
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
                        options={statusOptions}
                        selected={draft.status}
                        onChange={handleChangeCheckBoxGroup}
                    />
                </div>

                {/* Priority */}
                <div style={filterRow}>
                    <div style={{ minWidth: "60px" }}>Priority:</div>
                    <CheckBoxGroup
                        name="priority"
                        options={ISSUE_PRIORITIES}
                        selected={draft.priority}
                        onChange={handleChangeCheckBoxGroup}
                    />
                </div>

                {/* Type */}
                <div style={filterRow}>
                    <div style={{ minWidth: "60px" }}>Type:</div>
                    <CheckBoxGroup
                        name="type"
                        options={ISSUE_TYPES}
                        selected={draft.type}
                        onChange={handleChangeCheckBoxGroup}
                    />
                </div>
            </div>

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

                {!isMember(user) && teamMembers.length > 0 &&
                    <select name="assignedTo" value={draft.assignedTo} onChange={handleChange}>
                        <option value="">All Members</option>
                        {teamMembers.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.name}
                            </option>
                        ))}
                    </select>
                }

                <button type="submit">Search</button>
                <button type="button" onClick={onReset}>Reset</button>
            </div>

            {/* ── Quick filter ── */}
            {isMember(user) && (
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                    <label>
                        <input
                            name="assignedTo"
                            type="checkbox"
                            checked={applied.assignedTo === user.id}
                            onChange={handleChangeAssignedTo}
                        />{" "}
                        Assigned to me
                    </label>
                </div>
            )}

        </form>
    );
}

export default IssueFilter;