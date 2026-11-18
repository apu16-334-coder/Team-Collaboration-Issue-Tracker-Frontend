import { useOutletContext } from "react-router-dom";
import useApi from "../../shared/hooks/useApi";
import useListQuery from "../../shared/hooks/useListQuery";
import ProjectFilters from "../projects/ProjectFilters";
import SortSelect from "../../shared/ui/SortSelect";
import ListResults from "../../shared/ui/ListResults";
import EmptyState from "../../shared/ui/EmptyState";
import ProjectList from "../projects/ProjectList";
import Pagination from "../../shared/ui/Pagination";
import { PROJECT_SORT_OPTIONS } from "../projects/projectOptions";

function TeamProjectsTab() {
    const { params, hasActiveQuery, applyFilters, setSort, setPage, reset } = useListQuery({ filterKeys: ['search', 'status'] })

    const { team } = useOutletContext();

    const { response, isLoading, error, refetch } = useApi(`/teams/${team.id}/projects`, { params });

    const projects = response?.data ?? [];
    const total = response?.total ?? 0;

    return (
        <>
            <ProjectFilters
                key={`${params.search ?? ""}|${params.status ?? ""}`}
                applied={params}
                onApply={applyFilters}
                onReset={reset}
            />

            <SortSelect params={params} options={PROJECT_SORT_OPTIONS} setSort={setSort} />

            <ListResults
                isLoading={isLoading}
                error={error}
                onRetry={refetch}
                loadingLabel="Loading projects..."
                isEmpty={projects.length === 0}
                empty={
                    <EmptyState
                        title="No projects found"
                        message={hasActiveQuery ? "No project matches this search or page." : "No projects exist yet."}
                        action={hasActiveQuery ? <button onClick={reset}>Reset</button> : null}
                    />
                }
            >
                <ProjectList projects={projects} />
                <Pagination page={params?.page} total={total} limit={params?.limit} onPageChange={setPage} />
            </ListResults>
        </>
    )
}

export default TeamProjectsTab;