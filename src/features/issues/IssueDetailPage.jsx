import { Link, useParams } from "react-router-dom"
import useApi from "../../shared/hooks/useApi";
import Spinner from "../../shared/ui/Spinner";
import ErrorState from "../../shared/ui/ErrorState";
import CommentSection from "../comments/CommentSection";
import { can, allowedIssueStatuses } from "../auth/permissions";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

const metaStyle = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    color: "#666",
    marginBottom: "8px",
};

function IssueDetailPage() {
    const { issueId } = useParams();

    const { user } = useContext(AuthContext)

    const { response, isLoading, error, refetch } = useApi(`/issues/${issueId}`);

    // State for the three actions below — you wire the actual Modal/ConfirmDialog
    // bodies and submit handlers; these just control which one is open.
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [statusDraft, setStatusDraft] = useState("");

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

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                <h1 style={{ margin: 0 }}>{issue.title}</h1>

                {/* Edit: relationship rule — lead, or creator+assignee member. */}
                {can.editIssue(user, issue)  && issue.status !== "cancelled" && (
                    <button onClick={() => setIsEditOpen(true)}>Edit</button>
                )}
            </div> 

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

            {/* reopen cancelled issue. */}
            {can.reopenIssue(user) && issue.status === "cancelled" && (
                <div>
                    <button>Re-open</button>
                </div>
            )}

            {/* Status change: separate gate from Edit — an assignee-only member
                gets this control even with no Edit button above. */}
            {can.changeIssueStatus(user, issue) && issue.status !== "cancelled" && (
                <div style={{ display: "flex", gap: "8px", alignItems: "center", margin: "12px 0" }}>
                    <select
                        value={statusDraft || issue.status}
                        onChange={(event) => setStatusDraft(event.target.value)}
                    >
                        {allowedIssueStatuses(user).map((status) => (
                            <option key={status} value={status}>{status.replace("_", " ")}</option>
                        ))}
                    </select>
                    <button disabled={!statusDraft || statusDraft === issue.status}>
                        Update status
                    </button>
                </div>
            )}

            {/* Cancel: lead only, soft delete. */}
            {can.deleteIssue(user) && issue.status !== "cancelled" && (
                <button onClick={() => setIsCancelOpen(true)} style={{ marginBottom: "12px" }}>
                    Cancel
                </button>
            )}

            {issue.description && <p style={{ whiteSpace: "pre-wrap" }}>{issue.description}</p>}

            <CommentSection issue={issue} />
        </>
    )
}

export default IssueDetailPage;