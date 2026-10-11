// A field can be a populated object or a plain id string.
const idOf = (value) => (value && typeof value === 'object' ? value.id : value) ?? null;

const isAdmin = (user) => user?.role === 'admin';
const isLead = (user) => user?.role === 'team_lead';
const isMember = (user) => user?.role === 'member';
const isIssueCreator = (user, issue) => isMember(user) && idOf(issue.createdBy) === user?.id;
const isIssueAssignee = (user, issue) => isMember(user) && idOf(issue.assignedTo) === user?.id;

export const can = {
    // role rules: only the user matters
    manageUsers: (user) => isAdmin(user),
    manageTeams: (user) => isAdmin(user),
    createProject: (user) => isLead(user),
    editProject: (user) => isAdmin(user) || isLead(user),
    deleteProject: (user) => isAdmin(user),
    createIssue: (user) => isLead(user) || isMember(user),
    assignIssueToOthers: (user) => isLead(user),
    deleteIssue: (user) => isLead(user),
    createComment: (user) => isLead(user) || isMember(user),

    // relationship rules: user AND the record
    editIssue: (user, issue) => isLead(user) || isIssueCreator(user, issue) && isIssueAssignee(user, issue),
    changeIssueStatus: (user, issue) => isLead(user) || isIssueAssignee(user, issue),
    editComment: (user, comment) => idOf(comment.author) === user?.id,
    deleteComment: (user, comment) => idOf(comment.author) === user?.id,
};

// lists
export function editableProjectFields(user) {
    if (isAdmin(user)) return ['title', 'description', 'status', 'team', 'dueDate'];
    if (isLead(user)) return ['title', 'description', 'status'];
    return []
}

export function allowedProjectStatuses(user) {
    return can.editProject(user) ? ['planning', 'active', 'on_hold', 'completed'] : [];
}

export function editableIssueFields(user) {
    if(isLead(user)) return ['title', 'description', 'priority', 'type', 'project', 'assignedTo', 'dueDate'];
    if(isMember(user)) return ['title', 'description', 'priority', 'type', 'project'];
    return [];
}

export function allowedIssueStatuses(user) {
    if(isLead(user)) return ['open', 'in_progress', 'done', 'in_review', 'closed'];
    if(isMember(user)) return ['open', 'in_progress', 'done'];
    return [];
}