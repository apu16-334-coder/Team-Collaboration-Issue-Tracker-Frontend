// Dates from the API are ISO strings (or missing). Missing shows a dash.

function formatDate(value) {
    return value ? new Date(value).toLocaleDateString() : "—";
}