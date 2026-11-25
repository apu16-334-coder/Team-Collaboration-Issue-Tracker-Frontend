import IssueList from "../issues/IssueList";
import ListResults from "../../shared/ui/ListResults";
import EmptyState from "../../shared/ui/EmptyState";
import Pagination from "../../shared/ui/Pagination";
import IssueFilter from "../issues/IssueFilter";
import useListQuery from "../../shared/hooks/useListQuery";
import { ISSUE_SORT_OPTIONS } from '../issues/issueOptions'
import SortSelect from "../../shared/ui/SortSelect";
import useApi from "../../shared/hooks/useApi";

const filterKeys = ["search", "status", "priority", "type", "assignedTo"]

function ProjectIssuesSection({ project }) {
    const { params, hasActiveQuery, applyFilters, setSort, setPage, reset } = useListQuery({ filterKeys });

    const { response, isLoading, error, refetch } = useApi(`/projects/${project.id}/issues`, { skip: !project, params });

    let teamMembers = []
    if (project.team) {
        const { response } = useApi(`/teams/${project.team.id}`)
        teamMembers = response?.data?.members ?? [];
    }

    const issues = response?.data ?? [];
    const total = response?.total ?? 0;

    return (
        <>
            <h3>Issue List</h3>
            <IssueFilter
                key={`${params.search ?? ""}|${params.status ?? ""}|${params.priority ?? ""}|${params.type ?? ""}|${params.assignedTo ?? ""}`}
                applied={params}
                onApply={applyFilters}
                onReset={reset}
                teamMembers={teamMembers}
            />

            <SortSelect params={params} options={ISSUE_SORT_OPTIONS} setSort={setSort} />

            <ListResults
                isLoading={isLoading}
                error={error}
                onRetry={refetch}
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
                <Pagination page={params.page} total={total} limit={params.limit} onPageChange={setPage} />
            </ListResults>
        </>
    )
}

export default ProjectIssuesSection;