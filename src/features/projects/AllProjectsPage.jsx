import { Link } from "react-router-dom";
import useApi from "../../shared/hooks/useApi";
import Spinner from "../../shared/ui/Spinner";
import ErrorState from "../../shared/ui/ErrorState";
import EmptyState from "../../shared/ui/EmptyState";
import useListQuery from '../../shared/hooks/useListQuery'
import ProjectList from './ProjectList'
import ProjectFilters from './ProjectFilters'

const filterKeys = ['search', 'status']

function AllProjectsPage() {
    const { params, hasActiveQuery, applyFilters, setSort, setPage, reset } = useListQuery({ filterKeys })

    const { response, isLoading, error, refetch } = useApi('/projects', { params });

    const projects = response?.data ?? [];

    if (isLoading) return <Spinner label='Loading Projects...' />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;
    if (projects.length === 0) return <EmptyState title="No projects yet" message="Projects will appear here once teams create them." />

    return (
        <>
            <div>
                <h1>Projects</h1>
                <ProjectFilters applied={params} onApply={applyFilters} onReset={reset} />

                <ProjectList projects={projects} />
            </div> <br />
        </>
    )
}

export default AllProjectsPage;