import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { isAdmin } from "../auth/permissions";
import useApi from '../../shared/hooks/useApi'
import useListQuery from "../../shared/hooks/useListQuery";
import TeamsList from './TeamList'
import ListResults from '../../shared/ui/ListResults'
import EmptyState from "../../shared/ui/EmptyState";
import Pagination from "../../shared/ui/Pagination";

const ADMIN_FILTER_KEYS = ["search", "isActive"];
const MY_FILTER_KEYS = ["search"];

const NO_TEAMS_MESSAGE = {
    admin: "No teams exist yet.",
    team_lead: "You don't lead any team yet.",
    member: "You are not a member of any team yet.",
};

function TeamsPage() {
    const { user } = useContext(AuthContext);
    const admin = isAdmin(user);

    const { params, hasActiveQuery, applyFilters, setSort, setPage, reset } = useListQuery(admin ? ADMIN_FILTER_KEYS : MY_FILTER_KEYS);

    const { response, isLoading, error, refetch } = useApi(admin ? '/teams' : '/teams/my', { params });

    const teams = response?.data ?? [];
    const total = response?.total ?? 0;

    return (
        <>
            <ListResults
                isLoading={isLoading}
                error={error}
                onRetry={refetch}
                loadingLabel="Loading teams..."
                isEmpty={teams.length === 0}
                empty={
                    <EmptyState
                        title="No teams found"
                        message={hasActiveQuery ? "No team matches this search or page." : NO_TEAMS_MESSAGE[user.role]}
                        action={hasActiveQuery ? <button onClick={reset}>Reset</button> : null}
                    />
                }
            >
                <TeamsList teams={teams} />
                <Pagination page={params?.page} total={total} limit={params?.limit} onPageChange={setPage} />

            </ListResults>
        </>
    );
}

export default TeamsPage;