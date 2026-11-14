import Spinner from './Spinner';
import ErrorState from './ErrorState';

function ListResults({ isLoading, error, onRetry, loadingLabel, isEmpty, empty, children }) {
    if (isLoading) return <Spinner label={loadingLabel} />;
    else if (error) return <ErrorState message={error} onRetry={onRetry} />;
    else if (isEmpty) return empty;
    else return children;
}

export default ListResults;