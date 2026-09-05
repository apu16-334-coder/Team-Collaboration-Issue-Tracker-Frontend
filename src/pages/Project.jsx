import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";


function Project() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await axiosClient.get('/projects');

                setProjects(response.data.data)


            } catch (err) {
                setError(err.response?.data?.message || 'Fetching projects failed')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProjects();
    }, [])

    if (isLoading) return <p>Loading projects...</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <>
            <div>
                <h1>Projects</h1>
                {projects.length === 0 && <p>No projects yet.</p>}
                <ul>
                    {projects.map(project => (
                        <li key={project.id}>
                            <Link to={`/projects/${project.id}`}>{project.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Project;