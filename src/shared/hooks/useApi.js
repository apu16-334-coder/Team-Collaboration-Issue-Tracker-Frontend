// src/shared/hooks/useApi.js
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "../../api/axiosClient";
import getErrorMessage from "../utils/getErrorMessage";

function useApi(url, { skip = false, ...config } = {}) {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(!skip);
    const [error, setError] = useState(null);
    const [reloadIndex, setReloadIndex] = useState(0);

    const refetch = useCallback(() => setReloadIndex(i => i + 1), []);

    useEffect(() => {
        if (skip) return;

        const controller = new AbortController();

        async function load() {
            try {
                setIsLoading(true);
                setError(null);
                const res = await axiosClient.get(url, { ...config, signal: controller.signal });
                setResponse(res.data);
            } catch (err) {
                if (axios.isCancel(err)) return; // we cancelled it ourselves, not a real error
                setError(getErrorMessage(err));
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }

        load();
        return () => controller.abort(); // url changed or unmounted: cancel the old request
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, JSON.stringify(config), skip, reloadIndex]);

    return { response, isLoading, error, refetch };
}

export default useApi;