import { Link } from "react-router-dom";
import useApi from "../../shared/hooks/useApi";
import Spinner from "../../shared/ui/Spinner";
import ErrorState from "../../shared/ui/ErrorState";
import EmptyState from "../../shared/ui/EmptyState";

function AllProjectsPage() {
    const { response, isLoading, error, refetch } = useApi('/projects');
    const projects = response?.data ?? [];

    if (isLoading) return <Spinner label='Loading Projects...' />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;
    if (projects.length === 0) return <EmptyState title="No projects yet" message="Projects will appear here once teams create them." />

    return (
        <>
            <div>
                <h1>Projects</h1>
                <ul>
                    {projects.map(project => (
                        <li key={project.id}>
                            <Link to={`/projects/${project.id}`}>{project.title}</Link>
                        </li>
                    ))}
                </ul>
            </div> <br />
        </>
    )
}

export default AllProjectsPage;