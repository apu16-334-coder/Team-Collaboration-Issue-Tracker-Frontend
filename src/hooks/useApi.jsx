import { useCallback, useEffect, useState } from "react"
import axiosClient from "../api/axiosClient";
import axios from "axios";


function useApi(url, { params, skip = false, skipAuthRedirect = false } = {}) {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(!skip);
    const [error, setError] = useState(null);

    const [reloadIndex, setReloadIndex] = useState(0);
    const refetch = useCallback(() => setReloadIndex(i => i + 1), []);


    useEffect(() => {
        if (skip) return;

        const controller = new AbortController();

        async function fetch() {
            try {
                setIsLoading(true);
                setError(null);

                const res = await axiosClient.get(url, {
                    params,
                    skipAuthRedirect,
                    signal: controller.abort
                });

                setResponse(res.data);
            } catch (err) {
                if (axios.isCancel(err)) return;
                setError(err.response?.data?.message || "Something went wrong");
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }

        fetch();
        return () => controller.abort();

    }, [url, JSON.stringify(params), skip, skipAuthRedirect])

    return {
        response,
        isLoading,
        error,
        refetch,
    }
}

export default useApi;