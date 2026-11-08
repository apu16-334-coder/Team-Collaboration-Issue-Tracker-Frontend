// Statuses an admin can FILTER by (all six).
// Not the same as allowedProjectStatuses() in permissions.js, which lists what you may SET.
export const PROJECT_STATUSES = [
    "planning",
    "active",
    "on_hold",
    "completed",
    "cancelled",
    "archived",
]

export const PROJECT_SORT_OPTIONS = [
    { value: "-createdAt", label: "Newest" },
    { value: "createdAt", label: "Oldest" },
    { value: "dueDate", label: "Due soonest" },
    { value: "-dueDate", label: "Due latest" },
]