// src/features/issues/IssueList.jsx
import { Link } from "react-router-dom";
import formatDate from "../../shared/utils/formatDate";

const rowLinkStyle = {
    display: "block",
    padding: "12px 8px",
    textDecoration: "none",
    color: "inherit",
};

const metaStyle = {
    display: "flex",
    gap: "16px",
    marginTop: "4px",
    color: "#666",
    fontSize: "0.9rem",
};

function IssueList({ issues = [] }) {
    return (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {issues.map((issue) => (
                <li key={issue.id} style={{ borderBottom: "1px solid #ddd" }}>
                    {/* Route doesn't exist yet (built in Step 6) — same precedent as
                        ProjectList linking to /projects/:id before this page existed. */}
                    <Link to={`/issues/${issue.id}`} style={rowLinkStyle}>
                        <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {issue.title}
                        </div>

                        <div style={metaStyle}>
                            <span>{issue.status.replace("_", " ")}</span>
                            <span>{issue.priority}</span>
                            <span>{issue.type}</span>
                            <span>{issue.assignedTo?.name ?? "Unassigned"}</span>
                            <span>
                                {issue.dueDate ? `Due ${formatDate(issue.dueDate)}` : "No due date"}
                            </span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default IssueList;