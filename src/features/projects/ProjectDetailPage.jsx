import { Link, useParams, useNavigate } from "react-router-dom";
import useApi from "../../shared/hooks/useApi";
import Spinner from "../../shared/ui/Spinner";
import ErrorState from '../../shared/ui/ErrorState';
import formatDate from "../../shared/utils/formatDate";
import ProjectIssuesSection from "./ProjectIssuesSection";

function ProjectDetailPage() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const { response, isLoading, error, refetch } = useApi(`/projects/${projectId}`);
    
    if (isLoading) return <Spinner label="Loading project..." />;
    // The page decides nothing about access: the backend answers 403/404 and we display it.
    // Returning here also means the tabs never mount, so they never fire a second failing request.
    if (error) return <ErrorState
        error={error}
        onRetry={refetch}
        action={<button onClick={() => navigate(-1)}>Back</button>}
    />

    const project = response?.data ?? null;
    if (!project) return null;

    return (
        <>
            <h1>{project.title}</h1>

            <div style={{ display: "flex", gap: "16px", color: "#666", marginBottom: "8px" }}>
                <span>{project.status.replace("_", " ")}</span>
                <span>{project.dueDate ? `Due ${formatDate(project.dueDate)}` : "No due date"}</span>
                {project.team ? (
                    <Link to={`/teams/${project.team.id}`}>{project.team.title}</Link>
                ) : (
                    <span>No team</span>
                )}
            </div>

            {project.description && <p style={{ whiteSpace: "pre-wrap" }} >{project.description}</p>}

            <ProjectIssuesSection project={project} />
        </>
    )
}

export default ProjectDetailPage;