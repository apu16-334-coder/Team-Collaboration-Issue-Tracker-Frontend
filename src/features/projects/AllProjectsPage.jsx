import useApi from "../../shared/hooks/useApi";
import EmptyState from "../../shared/ui/EmptyState";
import useListQuery from '../../shared/hooks/useListQuery'
import ProjectList from './ProjectList'
import ProjectFilters from './ProjectFilters'
import Pagination from "../../shared/ui/Pagination";
import { PROJECT_SORT_OPTIONS } from './projectOptions'
import SortSelect from "../../shared/ui/SortSelect";
import ListResults from "../../shared/ui/ListResults";

const filterKeys = ['search', 'status']

function AllProjectsPage() {
    const { params, hasActiveQuery, applyFilters, setSort, setPage, reset } = useListQuery({ filterKeys })

    const { response, isLoading, error, refetch } = useApi('/projects', { params });
    const projects = response?.data ?? [];
    const total = response?.total ?? 0;

    return (
        <>
            <div>
                <h1>Projects</h1>
                <ProjectFilters applied={params} onApply={applyFilters} onReset={reset} />
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

            </div> <br />
        </>
    )
}

export default AllProjectsPage;