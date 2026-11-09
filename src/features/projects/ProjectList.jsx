// src/features/projects/ProjectList.jsx
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

function ProjectList({ projects }) {
    return (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {projects.map((project) => (
                <li key={project.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <Link to={`/projects/${project.id}`} style={rowLinkStyle}>
                        <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {project.title}
                        </div>

                        <div style={metaStyle}>
                            <span>{project.team?.title ?? "No team"}</span>
                            <span>{project.status.replace("_", " ")}</span>
                            <span>
                                {project.dueDate ? `Due ${formatDate(project.dueDate)}` : "No due date"}
                            </span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default ProjectList;