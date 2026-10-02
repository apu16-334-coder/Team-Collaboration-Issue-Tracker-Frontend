// src/shared/utils/getErrorMessage.js
export default function getErrorMessage(err, fallback = "Something went wrong") {
    if (!err.response) return "Cannot reach the server. Check your connection.";
    const data = err.response.data;
    if (typeof data === "string") return data; // rate limiter
    return data?.message || fallback; // AppError shape
}