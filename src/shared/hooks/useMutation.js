import { useCallback, useState } from "react";
import axiosClient from "../../api/axiosClient";
import getErrorMessageAndStatus from "../utils/getErrorMessageAndStatus";

function useMutation() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutate = useCallback(async (method, url, data, config = {}) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axiosClient.request({ method, url, data, ...config });
            return { ok: true, data: response?.data };
        } catch (err) {
            const error = getErrorMessageAndStatus(err)
            setError(error);
            return { ok: false, error };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { mutate, isLoading, error };
}

export default useMutation;