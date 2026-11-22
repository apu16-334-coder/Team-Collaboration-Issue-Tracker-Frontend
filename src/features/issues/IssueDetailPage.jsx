import { Link, useParams } from "react-router-dom"
import useApi from "../../shared/hooks/useApi";
import Spinner from "../../shared/ui/Spinner";
import ErrorState from "../../shared/ui/ErrorState";
import CommentSection from "../comments/CommentSection";

const metaStyle = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    color: "#666",
    marginBottom: "8px",
};

function IssueDetailPage() {
    const { issueId } = useParams();

    const { response, isLoading, error, refetch } = useApi(`/issues/${issueId}`);

    if (isLoading) return <Spinner label="Loading issue..." />;

    // The page decides nothing about access: the backend answers 403/404 and we display it.
    // Returning here also means the tabs never mount, so they never fire a second failing request.
    if (error) return <ErrorState
        error={error}
        onRetry={refetch}
        action={<button onClick={() => navigate(-1)}>Back</button>}
    />

    const issue = response?.data ?? null;
    if (!issue) return null;

    // `project` may be a plain id or a populated object; tolerate both.
    const projectId = issue.project?.id ?? issue.project ?? null;
    const projectTitle = issue.project?.title ?? "Back to project";

    return (
        <>
            {projectId && <Link to={`/projects/${projectId}`}>{projectTitle}</Link>}

            <h1>{issue.title}</h1>

            {issue.status === "cancelled" && (
                <p style={{ color: "#a00" }}>This issue was cancelled.</p>
            )}

            <div style={metaStyle}>
                <span>{issue.status.replace("_", " ")}</span>
                <span>{issue.priority}</span>
                <span>{issue.type}</span>
                <span>{issue.dueDate ? `Due ${formatDate(issue.dueDate)}` : "No due date"}</span>
            </div>

            <div style={metaStyle}>
                <span>Assigned to: {issue.assignedTo?.name ?? "Unassigned"}</span>
                <span>Created by: {issue.createdBy?.name ?? "Unknown"}</span>
            </div>

            {issue.description && <p style={{ whiteSpace: "pre-wrap" }}>{issue.description}</p>}

            <CommentSection issue={issue} />
        </>
    )
}

export default IssueDetailPage;