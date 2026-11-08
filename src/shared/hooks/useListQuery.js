// src/shared/hooks/useListQuery.js
import { useSearchParams } from "react-router-dom";

const BASE_DEFAULT = { page: 1, limit: 10, sort: '-createdAt' };

// Reads list state (filters, sort, page) from the URL and gives back:
//   params         -> pass to useApi: useApi(url, { params })
//   applyFilters   -> write filters to the URL (resets page to 1)
//   setSort        -> immediate (resets page to 1)
//   setPage        -> immediate
//   reset          -> clear everything
function useListQuery({ filterKeys = [], defaults = {} } = {}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const base = { ...BASE_DEFAULT, ...defaults };
    const params = { ...base }; // copy of base

    for (const key of ['page', 'sort', ...filterKeys]) {
        const value = searchParams.get(key);

        if (value) params[key] = value;
    }

    params.page = Math.max(1, parseInt(params.page, 10) || 1);

    return { params }
}

export default useListQuery;
