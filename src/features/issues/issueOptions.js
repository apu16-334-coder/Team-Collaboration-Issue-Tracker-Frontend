// src/features/issues/issueOptions.js

// Statuses an admin/lead may FILTER by (lead can see issues they cancelled).
export const ISSUE_STATUSES = [
    "open",
    "in_progress",
    "in_review",
    "done",
    "closed",
    "cancelled",
];

// What a member sees: GET /projects/:id/issues hides cancelled for them.
export const VISIBLE_ISSUE_STATUSES = [
    "open",
    "in_progress",
    "in_review",
    "done",
    "closed",
];

export const ISSUE_PRIORITIES = ["low", "medium", "high", "critical"];

export const ISSUE_TYPES = ["bug", "feature", "task", "improvement"];

export const ISSUE_SORT_OPTIONS = [
    { value: "-createdAt", label: "Newest" },
    { value: "createdAt", label: "Oldest" },
    { value: "dueDate", label: "Due soonest" },
    { value: "-dueDate", label: "Due latest" },
];