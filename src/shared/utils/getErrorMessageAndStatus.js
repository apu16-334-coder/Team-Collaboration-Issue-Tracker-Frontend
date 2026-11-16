// src/shared/utils/getErrorMessage.js
export default function getErrorMessageAndStatus(err, fallback = "Something went wrong") {
    if (!err.response) return {message: 'Cannot reach the server. Check your connection.'};
    const data = err.response.data;
    if (typeof data === "string") return {
        status: err.response.status ?? null,
        message: data,
    }; // rate limiter
    return {
        status: err.response.status ?? null,
        message: data?.message || fallback, // AppError shape
    }
}