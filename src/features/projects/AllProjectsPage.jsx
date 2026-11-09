import { Link } from "react-router-dom";
import useApi from "../../shared/hooks/useApi";
import Spinner from "../../shared/ui/Spinner";
import ErrorState from "../../shared/ui/ErrorState";
import EmptyState from "../../shared/ui/EmptyState";
import useListQuery from '../../shared/hooks/useListQuery'
import ProjectList from './ProjectList'
import ProjectFilters from './ProjectFilters'
import Pagination from "../../shared/ui/Pagination";

const filterKeys = ['search', 'status']

function AllProjectsPage() {
    const { params, hasActiveQuery, applyFilters, setSort, setPage, reset } = useListQuery({ filterKeys })

    const { response, isLoading, error, refetch } = useApi('/projects', { params });

    const projects = response?.data ?? [];
    const total = response?.total ?? 0;

    let result;

    if (isLoading) result = <Spinner label='Loading Projects...' />;
    else if (error) result = <ErrorState message={error} onRetry={refetch} />;
    else if (projects.length === 0) {
        result = <EmptyState
            title="No projects yet"
            message={hasActiveQuery ? "No project matches this search or page." : "No projects exist yet."}
            action={hasActiveQuery ? <button onClick={reset}>Reset</button> : null}
        />
    } else {
        result = <>
            <ProjectList projects={projects} />
            <Pagination page={params.page} total={total} limit={params.limit} onPageChange={setPage} />
        </>
    }

    return (
        <>
            <div>
                <h1>Projects</h1>
                <ProjectFilters applied={params} onApply={applyFilters} onReset={reset} />

                {result}
            </div> <br />
        </>
    )
}

export default AllProjectsPage;