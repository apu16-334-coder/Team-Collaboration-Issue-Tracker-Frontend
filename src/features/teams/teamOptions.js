export const TEAM_SORT_OPTIONS = [
    { value: "-createdAt", label: "Newest first" },
    { value: "createdAt", label: "Oldest first" },
];

// Admin only: GET /teams returns active and inactive teams.
export const TEAM_ACTIVE_OPTIONS = [
    { value: "", label: "All teams" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
];