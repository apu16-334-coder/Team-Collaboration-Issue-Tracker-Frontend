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

    function update(changes) {
        const next = { ...params, ... changes }

        for (const [key, value] of Object.entries(next)) {
            const isEmpty = value === "" || value == null;
            const isDefault = String(value) === String(base[key]);

            if (isEmpty || isDefault) delete next[key];
            else next[key] = value;
        }

        setSearchParams(next);
    }

    return {
        params,
        hasActiveQuery: searchParams.toString() !== "",
        applyFilters: (filters) => update({ ...filters, page: 1 }),
        setSort: (sort) => update({ sort, page: 1 }),
        setPage: (page) => update({ page }),
        reset: () => setSearchParams({}),
    }
}

export default useListQuery;
