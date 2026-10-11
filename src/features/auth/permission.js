// Single source of truth for "who may do what" in the UI.
// Two kinds of rules:
//   - Role rules:         need only `user`.
//   - Relationship rules: need `user` AND the record (assignee, author, ...).
//
// Use can.* for "may this user do X?" (buttons, forms, fields).
// Use isAdmin / isLead / isMember only to choose which view to render.

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// A reference field can arrive populated or as a plain id string.
const idOf = (value) => (value && typeof value === 'object' ? value.id : value) ?? null;

// Role checks. `?.` makes a missing user return false instead of crashing.
export const isAdmin = (user) => user?.role === 'admin';
export const isLead = (user) => user?.role === 'team_lead';
export const isMember = (user) => user?.role === 'member';

// Relationship checks. Members only: a lead's access comes from the role
// (the backend only returns records of teams they lead), so these are not
// used for leads.
const isIssueCreator = (user, issue) => isMember(user) && idOf(issue?.createdBy) === user?.id;
const isIssueAssignee = (user, issue) => isMember(user) && idOf(issue?.assignedTo) === user?.id;

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

export const can = {
    // --- Role rules: only the user matters ---
    manageUsers: (user) => isAdmin(user),
    manageTeams: (user) => isAdmin(user),
    createProject: (user) => isLead(user),
    editProject: (user) => isAdmin(user) || isLead(user),
    deleteProject: (user) => isAdmin(user), // archive or cancel
    createIssue: (user) => isLead(user) || isMember(user),
    // Create form only: lead picks any team member, member can only assign
    // themselves. On the edit form use editableIssueFields instead.
    assignIssueToOthers: (user) => isLead(user),
    deleteIssue: (user) => isLead(user), // soft delete -> cancelled
    createComment: (user) => isLead(user) || isMember(user),

    // --- Relationship rules: the user AND the record ---

    // A lead can edit issue 
    // A member needs to be both creator and assignee to edit issue
    // a member who creates an issue without assigning it to themselves hands it to the lead (createdBy is history).
    // Admin never edits issues.
    editIssue: (user, issue) =>
        isLead(user) || (isIssueCreator(user, issue) && isIssueAssignee(user, issue)),

    // Gates the issue status control. Separate from editIssue because an assignee who
    // is not the creator may change status but nothing else.
    changeIssueStatus: (user, issue) => isLead(user) || isIssueAssignee(user, issue),

    // Author only
    editComment: (user, comment) => idOf(comment.author) === user?.id,
    deleteComment: (user, comment) => idOf(comment.author) === user?.id,
};

// ---------------------------------------------------------------------------
// Lists: which options a form may offer
// ---------------------------------------------------------------------------

// Fields the project edit form may show. Status and team are in the list, so
// the form checks `fields.includes('team')` rather than the role.
export function editableProjectFields(user) {
    if (isAdmin(user)) return ['title', 'description', 'status', 'team', 'dueDate'];
    if (isLead(user)) return ['title', 'description', 'status'];
    return [];
}

// Statuses a project can be set to. cancelled/archived are reached only
// through Delete, never through this list.
export function allowedProjectStatuses(user) {
    return can.editProject(user) ? ['planning', 'active', 'on_hold', 'completed'] : [];
}

// Fields the issue edit form may show. Role-based only (no issue argument),
// so it knows nothing about the user's relationship to the issue: only call it
// when can.editIssue(user, issue) is true.
// `status` is not here: its control is gated by can.changeIssueStatus and
// filled from allowedIssueStatuses. Only a lead may change `assignedTo`.
export function editableIssueFields(user) {
    if (isLead(user)) return ['title', 'description', 'priority', 'type', 'project', 'assignedTo', 'dueDate'];
    if (isMember(user)) return ['title', 'description', 'priority', 'type', 'project'];
    return [];
}

// Statuses an issue can be set to, in workflow order. `cancelled` is reached
// only through Delete. A member can move work forward to `done`; review and
// closing belong to the lead.
export function allowedIssueStatuses(user) {
    if (isLead(user)) return ['open', 'in_progress', 'done', 'in_review', 'closed'];
    if (isMember(user)) return ['open', 'in_progress', 'done'];
    return [];
}