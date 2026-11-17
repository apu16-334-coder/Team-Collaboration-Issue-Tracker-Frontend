import { Link, NavLink, useParams, Outlet } from "react-router-dom"
import useApi from "../../shared/hooks/useApi";
import Spinner from "../../shared/ui/Spinner";
import ErrorState from '../../shared/ui/ErrorState';

const tabStyle = ({ isActive }) => ({
    marginRight: "16px",
    fontWeight: isActive ? "bold" : "normal",
});

function TeamDetailPage() {
    const { teamId } = useParams();

    const { response, isLoading, error, refetch } = useApi(`/teams/${teamId}`);

    if (isLoading) return <Spinner label="Loading team..." />
    // The page decides nothing about access: the backend answers 403/404 and we display it.
    // Returning here also means the tabs never mount, so they never fire a second failing request.
    if (error) return <ErrorState
        error={error}
        onRetry={refetch}
        action={<Link to='/teams'>Back To Teams</Link>}
    />
    const team = response?.data ?? null;
    if (!team) return null;

    return (
        <>
            <h1>
                {team.title}
                {!team.isActive && (
                    <span style={{ marginLeft: "8px", fontSize: "1rem", fontWeight: "normal" }}>(inactive)</span>
                )}
            </h1>
            {team.description && <p>{team.description}</p>}
            <p>Lead: {team.teamLead?.name ?? "none"}</p>
            

            <nav style={{ margin: "16px 0", paddingBottom: "8px", borderBottom: "1px solid #ddd" }}>
                {/* "." = this route's own path; `end` keeps it from staying active on /projects */}
                <NavLink to="." end style={tabStyle}>
                    Members
                </NavLink>
                <NavLink to="projects" style={tabStyle}>
                    Projects
                </NavLink>
            </nav>

            {/* Children read `team` with useOutletContext() and never refetch it */}
            <Outlet context={{ team }} />
        </>
    )
}

export default TeamDetailPage;