import { Link } from "react-router-dom";

// Temporary styles, deleted in Week 7. Copying them from ProjectList is cheaper than sharing them.
const rowLinkStyle = { display: "block", padding: "12px 8px", textDecoration: "none", color: "inherit" };
const metaStyle = { display: "flex", gap: "16px", marginTop: "4px", color: "#666", fontSize: "0.9rem" };

function TeamList({ teams }) {
    return (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {teams.map((team) => {
                const memberCount = team.members?.length ?? 0;

                return (
                    <li key={team.id} style={{ borderBottom: "1px solid #ddd" }}>
                        <Link to={`/teams/${team.id}`} style={rowLinkStyle}>
                            <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                                {team.title}
                                {team.isActive === false && (
                                    <span style={{ marginLeft: "8px", fontSize: "0.9rem", fontWeight: "normal" }}>
                                        (inactive)
                                    </span>
                                )}
                            </div>

                            <div style={metaStyle}>
                                <span>Lead: {team.teamLead?.name ?? "none"}</span>
                                <span>
                                    {memberCount} {memberCount === 1 ? "member" : "members"}
                                </span>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default TeamList;