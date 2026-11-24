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
import useMutation from "../../shared/hooks/useMutation";

function CommentSection({ issue }) {
    const { params, setPage } = useListQuery();
    const { user } = useContext(AuthContext);
    const { mutate } = useMutation();

    const { response, isLoading, error, refetch } = useApi(`/issues/${issue.id}/comments`, { skip: !issue, params });

    const comments = response?.data ?? [];
    const total = response?.total ?? 0;

    async function handleCreate(text) {
        const result = await mutate("post", `/issues/${issue.id}/comments`, { text });

        if (result.ok) {
            // console.log('creating...')
            if (params.page !== 1) setPage(1);
            else refetch();
        }

        return result;
    }

    function handleDelete() {
        if (params.page > 1 && comments.length === 1) setPage(params.page - 1);
        else refetch();
    }

    return (
        <>
            <section style={{ marginTop: "24px" }}>
                <h2>Comments{total > 0 ? ` (${total})` : ""}</h2>

                {can.createComment(user, issue) && (
                    <CommentForm
                        method={'post'}
                        url={`/issues/${issue.id}/comments`}
                        submitLabel="Add comment"
                        onSubmit={handleCreate}
                        clearOnSuccess
                    />
                )}

                <ListResults
                    isLoading={isLoading}
                    error={error}
                    onRetry={refetch}
                    loadingLabel="Loading comments..."
                    isEmpty={comments.length === 0}
                    empty={<EmptyState title="No comments yet" message="Nobody has commented on this issue." />}
                >
                    <CommentList
                        comments={comments}
                        issueId={issue.id}
                        onChange={refetch}
                        onDelete={handleDelete}
                    />

                    <Pagination page={params.page} total={total} limit={params.limit} onPageChange={setPage} />
                </ListResults>
            </section>
        </>
    )
}

export default CommentSection;