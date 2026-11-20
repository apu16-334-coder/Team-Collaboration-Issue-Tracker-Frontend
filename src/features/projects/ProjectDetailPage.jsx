import { Link, NavLink, useParams, Outlet, useNavigate } from "react-router-dom";
import useApi from "../../shared/hooks/useApi";
import Spinner from "../../shared/ui/Spinner";
import ErrorState from '../../shared/ui/ErrorState';
import IssueList from "../issues/IssueList";
import ListResults from "../../shared/ui/ListResults";
import EmptyState from "../../shared/ui/EmptyState";

const tabStyle = ({ isActive }) => ({
    marginRight: "16px",
    fontWeight: isActive ? "bold" : "normal",
});

function ProjectDetailPage() {
    const { projectId } = useParams();

    const navigate = useNavigate();

    const { response, isLoading, error, refetch } = useApi(`/projects/${projectId}`);
    const project = response?.data ?? null;

    const { response: issueResponse, isLoading: issueIsLoading, error: issueError, refetch: issueRefetch } =
        useApi(`/projects/${projectId}/issues`, { skip: isLoading || !!error || !project });

    if (isLoading) return <Spinner label="Loading project..." />;
    // The page decides nothing about access: the backend answers 403/404 and we display it.
    // Returning here also means the tabs never mount, so they never fire a second failing request.
    if (error) return <ErrorState
        error={error}
        onRetry={refetch}
        action={<button onClick={() => navigate(-1)}>Back</button>}
    />

    if (!project) return null;

    console.log(issueResponse)

    const issues = issueResponse?.data ?? [];
    const total = issueResponse?.total ?? 0;
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

            {project.description && <p>{project.description}</p>}

            <ListResults
                isLoading={issueIsLoading}
                error={error}
                onRetry={issueError}
                loadingLabel='Loading issues...'
                isEmpty={issues.length === 0}
                empty={<EmptyState
                    title="No issues found"
                />}
            >
                <IssueList issues={issues} />
            </ListResults>
        </>
    )
}

export default ProjectDetailPage;