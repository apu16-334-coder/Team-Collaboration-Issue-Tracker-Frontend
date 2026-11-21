import { Link, NavLink, useParams, Outlet, useNavigate } from "react-router-dom";
import useApi from "../../shared/hooks/useApi";
import Spinner from "../../shared/ui/Spinner";
import ErrorState from '../../shared/ui/ErrorState';
import IssueList from "../issues/IssueList";
import ListResults from "../../shared/ui/ListResults";
import EmptyState from "../../shared/ui/EmptyState";
import Pagination from "../../shared/ui/Pagination";
import IssueFilter from "../issues/IssueFilter";
import useListQuery from "../../shared/hooks/useListQuery";
import { ISSUE_SORT_OPTIONS } from '../issues/issueOptions'
import SortSelect from "../../shared/ui/SortSelect";

const tabStyle = ({ isActive }) => ({
    marginRight: "16px",
    fontWeight: isActive ? "bold" : "normal",
});

const filterKeys = ["search", "status", "priority", "type", "assignedTo"]


function ProjectDetailPage() {
    const { params, hasActiveQuery, applyFilters, setSort, setPage, reset } = useListQuery({ filterKeys });

    const { projectId } = useParams();

    const navigate = useNavigate();

    const { response, isLoading, error, refetch } = useApi(`/projects/${projectId}`);
    const project = response?.data ?? null;

    const { response: issueResponse, isLoading: issueIsLoading, error: issueError, refetch: issueRefetch } =
        useApi(`/projects/${projectId}/issues`, { skip: isLoading || !!error || !project, params });

    if (isLoading) return <Spinner label="Loading project..." />;
    // The page decides nothing about access: the backend answers 403/404 and we display it.
    // Returning here also means the tabs never mount, so they never fire a second failing request.
    if (error) return <ErrorState
        error={error}
        onRetry={refetch}
        action={<button onClick={() => navigate(-1)}>Back</button>}
    />

    if (!project) return null;

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

            <h3>Issue List</h3>
            <IssueFilter
                key={`${params.search ?? ""}|${params.status ?? ""}|${params.priority ?? ""}|${params.type ?? ""}|${params.assignedTo ?? ""}`}
                applied={params}
                onApply={applyFilters}
                onReset={reset}
            />

            <SortSelect params={params} options={ISSUE_SORT_OPTIONS} setSort={setSort} />

            <ListResults
                isLoading={issueIsLoading}
                error={error}
                onRetry={issueError}
                loadingLabel='Loading issues...'
                isEmpty={issues.length === 0}
                empty={<EmptyState
                    title="No issues found"
                    message={hasActiveQuery ? "No issue matches this search or filter." : "No issues exist yet."}
                    action={hasActiveQuery ? <button onClick={reset}>Reset</button> : null}
                />
                }
            >   
                <IssueList issues={issues} />
                <Pagination page={params.page} total={total} limit={params.limit} onPageChange={setPage}   />
            </ListResults>
        </>
    )
}

export default ProjectDetailPage;