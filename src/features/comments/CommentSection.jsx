import useApi from "../../shared/hooks/useApi";
import useListQuery from "../../shared/hooks/useListQuery";
import EmptyState from "../../shared/ui/EmptyState";
import ListResults from "../../shared/ui/ListResults";
import Pagination from "../../shared/ui/Pagination";
import CommentList from "./CommentList";
import { can } from '../auth/permissions'
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext"
import CommentForm from "./CommentForm";

function CommentSection({ issue }) {
    const { params, setPage } = useListQuery();
    const { user } = useContext(AuthContext);

    const { response, isLoading, error, refetch } = useApi(`/issues/${issue.id}/comments`, { skip: !issue, params });

    const comments = response?.data ?? [];
    const total = response?.total ?? 0;

    function handleCreate() {
        // console.log('creating...')
        if(params.page > 1 && comments.length === 1) setPage(params.page -1);
        else refetch(); 
    }

    return (
        <>
            <section style={{ marginTop: "24px" }}>
                <h2>Comments{total > 0 ? ` (${total})` : ""}</h2>

                {can.createComment(user, issue) && (
                    <CommentForm
                        url={`/issues/${issue.id}/comments`}
                        submitLabel="Add comment" onSubmit={handleCreate} clearOnSuccess />
                )}

                <ListResults
                    isLoading={isLoading}
                    error={error}
                    onRetry={refetch}
                    loadingLabel="Loading comments..."
                    isEmpty={comments.length === 0}
                    empty={<EmptyState title="No comments yet" message="Nobody has commented on this issue." />}
                >
                    <CommentList comments={comments} />
                    <Pagination page={params.page} total={total} limit={params.limit} onPageChange={setPage} />
                </ListResults>
            </section>
        </>
    )
}

export default CommentSection;