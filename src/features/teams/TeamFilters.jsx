import { useState } from "react";
import { TEAM_ACTIVE_OPTIONS } from './teamOptions'

function TeamFilters({ applied, onApply, onReset, showActiveFilter }) {
        const [draft, setDraft] = useState({
            search: applied.search ?? "",
            isActive: applied.isActive ?? "",
        });

        function handleChange(event) {
            const { name, value } = event.target;
            setDraft(prev => ({ ...prev, [name]: value }))
        }

        function handleSubmit(event) {
            event.preventDefault();
            onApply({
                search: draft.search.trim(),
                isActive: showActiveFilter ? draft.isActive : "",
            });
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

                {showActiveFilter && (
                    <select name="isActive" value={draft.isActive} onChange={handleChange}>
                        {TEAM_ACTIVE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}

                <button type="submit">Search</button>
                <button type="button" onClick={onReset}>
                    Reset
                </button>
            </form>
        )
    }

export default TeamFilters;