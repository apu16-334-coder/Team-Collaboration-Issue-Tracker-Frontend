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

// What non-admins can see: GET /teams/:id/projects hides cancelled and archived for them.
export const VISIBLE_PROJECT_STATUSES = [
    "planning",
    "active",
    "on_hold",
    "completed",
]
export const PROJECT_SORT_OPTIONS = [
    { value: "-createdAt", label: "Newest" },
    { value: "createdAt", label: "Oldest" },
    { value: "dueDate", label: "Due soonest" },
    { value: "-dueDate", label: "Due latest" },
]