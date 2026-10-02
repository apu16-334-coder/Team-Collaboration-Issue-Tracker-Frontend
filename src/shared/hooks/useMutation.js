import { useCallback, useState } from "react";
import axiosClient from "../../api/axiosClient";
import getErrorMessage from "./getErrorMessage";

function useMutation() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutate = useCallback(async(method, url, body, config = {}) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axiosClient.request();
            return { ok: true, data: response?.data};
        } catch (err) {
            const message = getErrorMessage(err);
            setError(message);
            return { ok: false, error: message };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { mutate, isLoading, error };
}

export default useMutation;