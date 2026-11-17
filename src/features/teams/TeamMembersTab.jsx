import { useOutletContext } from "react-router-dom";
import EmptyState from "../../shared/ui/EmptyState";

function TeamMembersTab() {
    const { team } = useOutletContext();
    const members = team.members ?? [];

    if(members.length === 0) return <EmptyState title="No members yet" message="This team has no members." />;

    return (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {members.map((member) => (
                <li key={member.id} style={{ padding: "8px 0", borderBottom: "1px solid #ddd" }}>
                    <strong>{member.name}</strong> <span style={{ color: "#666" }}>{member.email}</span>
                </li>
            ))}
        </ul>
    );
}

export default TeamMembersTab;