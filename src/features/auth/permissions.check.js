// src/features/auth/permissions.check.js
//
// Table-driven check of the permission matrix (blueprint 2.3).
// Run from the project root:  node src/features/auth/permissions.check.js
// Each row is one matrix cell: [description, actual, expected].
// Adding a rule to permissions.js means adding its row here.

import {
    can,
    editableProjectFields,
    allowedProjectStatuses,
    editableIssueFields,
    allowedIssueStatuses,
} from './permissions.js';

// --- Actors ---------------------------------------------------------------
const admin = { id: 'a1', role: 'admin' };
const lead = { id: 'l1', role: 'team_lead' };
const m1 = { id: 'm1', role: 'member' };
const m2 = { id: 'm2', role: 'member' };

// --- Issues (the three relationships that matter for members) -------------
// m1 created it and is assigned to it
const ownIssue = { createdBy: { id: 'm1' }, assignedTo: { id: 'm1' } };
// the lead created it and assigned it to m1
const assignedByLead = { createdBy: { id: 'l1' }, assignedTo: { id: 'm1' } };
// m1 created it but did not assign it (handed to the lead)
const unassigned = { createdBy: { id: 'm1' }, assignedTo: null };
// same as ownIssue, but ids arrive as plain strings, not populated objects
const ownIssueIds = { createdBy: 'm1', assignedTo: 'm1' };

// --- Comments -------------------------------------------------------------
const m1Comment = { author: { id: 'm1' } };

const rows = [
    // ---- Users & teams (admin only) ----
    ['admin manage users', can.manageUsers(admin), true],
    ['lead can not manage users', can.manageUsers(lead), false],
    ['member can not manage users', can.manageUsers(m1), false],
    ['admin manage teams', can.manageTeams(admin), true],
    ['lead can not manage teams', can.manageTeams(lead), false],
    ['member can not manage teams', can.manageTeams(m1), false],

    // ---- Projects ----
    ['admin can not create project', can.createProject(admin), false],
    ['lead create project', can.createProject(lead), true],
    ['member can not create project', can.createProject(m1), false],
    ['admin can edit project', can.editProject(admin), true],
    ['lead can edit project', can.editProject(lead), true],
    ['member can not edit project', can.editProject(m1), false],
    ['admin can delete project', can.deleteProject(admin), true],
    ['lead can not delete project', can.deleteProject(lead), false],
    ['member can not delete project', can.deleteProject(m1), false],
    ['admin project fields', editableProjectFields(admin), ['title', 'description', 'status', 'team', 'dueDate']],
    ['lead project fields', editableProjectFields(lead), ['title', 'description', 'status']],
    ['member project fields', editableProjectFields(m1), []],
    ['admin allowed statuses', allowedProjectStatuses(admin), ['planning', 'active', 'on_hold', 'completed']],
    ['lead allowed statuses', allowedProjectStatuses(lead), ['planning', 'active', 'on_hold', 'completed']],
    ['member allowed statuses', allowedProjectStatuses(m1), []],

    // ---- Issues: create / delete ----
    ['admin can not create issue', can.createIssue(admin), false],
    ['lead create issue', can.createIssue(lead), true],
    ['member create issue', can.createIssue(m1), true],
    ['admin can not assign issue to others', can.assignIssueToOthers(admin), false],
    ['lead can assign issue to others', can.assignIssueToOthers(lead), true],
    ['member can not assign issue to others', can.assignIssueToOthers(m1), false],
    ['admin can not delete issue', can.deleteIssue(admin), false],
    ['lead can delete issue', can.deleteIssue(lead), true],
    ['member can not delete issue', can.deleteIssue(m1), false],

    // ---- Issues: edit (relationship rule) ----
    ['admin can not edit any issue', can.editIssue(admin, ownIssue), false],
    ['lead can edit any issue 1', can.editIssue(lead, ownIssue), true],
    ['lead can edit any issue 2', can.editIssue(lead, assignedByLead), true],
    ['lead can edit any issue 3', can.editIssue(lead, unassigned), true],
    ['lead can edit any issue 4', can.editIssue(lead, ownIssueIds), true],
    ['member can edit issue if he or she is the creator and assigne both 1', can.editIssue(m1, ownIssue), true],
    ['member can edit issue if he or she is the creator and assigne both 2', can.editIssue(m1, ownIssueIds), true],
    ['member can not edit issue if he or she is not the creator and assignee', can.editIssue(m1, assignedByLead), false],
    ['member can not edit issue if he or she is not the creator and assignee', can.editIssue(m1, unassigned), false],
    ['member can not edit issue if he or she is not the creator and assignee', can.editIssue(m1, unassigned), false],

    // ---- Issues: change status (relationship rule) ----
    ['admin can not change issue status', can.changeIssueStatus(admin, ownIssue), false],
    ['lead can change issue status', can.changeIssueStatus(lead, ownIssue), true],
    ['member can change issue status if he is the assignee', can.changeIssueStatus(m1, ownIssue), true],
    ['member can change issue status if he is the assignee', can.changeIssueStatus(m1, assignedByLead), true],
    ['member can not change issue status if he is not the assignee', can.changeIssueStatus(m2, assignedByLead), false],

    // ---- Issues: lists ----
    ['admin editable issue fields', editableIssueFields(admin), []],
    ['lead editable issue fields', editableIssueFields(lead), ['title', 'description', 'priority', 'type', 'project', 'assignedTo', 'dueDate']],
    ['member editable issue fields', editableIssueFields(m1), ['title', 'description', 'priority', 'type', 'project']],
    ['admin editable issue fields', allowedIssueStatuses(admin), []],
    ['lead editable issue fields', allowedIssueStatuses(lead), ['open', 'in_progress', 'done', 'in_review', 'closed']],
    ['member editable issue fields', allowedIssueStatuses(m1), ['open', 'in_progress', 'done']],

    // ---- Comments ----
    ['author can edit comment', can.editComment(m1, m1Comment), true],
    ['author can delete comment', can.deleteComment(m1, m1Comment), true],
    ['non-author can not edit comment', can.editComment(m2, m1Comment), false],
    ['non-author can not delete comment', can.deleteComment(m2, m1Comment), false],

    // ---- Safety: missing user / missing record never crashes ----
    // ---- Users & teams (admin only) ----
    ['null user: manage users', can.manageUsers(null), false],
    ['null user: manage teams', can.manageTeams(null), false],

    // ---- Projects ----
    ['null user: create project', can.createProject(null), false],
    ['null user: edit project', can.editProject(null), false],
    ['null user: delete project', can.deleteProject(null), false],

    // ---- Issues ----
    ['null user: create issue', can.createIssue(null), false],
    ['null user: assign issue to others', can.assignIssueToOthers(null), false],
    ['null user: delete issue', can.deleteIssue(null), false],
    ['null user: edit issue', can.editIssue(null, null), false],
    ['null user: change issue status', can.changeIssueStatus(null, null), false],

    // ---- Comments ----
    ['null user: create comment', can.createComment(null), false],
    ['null user: edit comment', can.editComment(null, null), false],
    ['null user: delete comment', can.deleteComment(null, null), false],

    // ---- Lists ----
    ['null user: editable project fields', editableProjectFields(null), []],
    ['null user: allowed project statuses', allowedProjectStatuses(null), []],
    ['null user: editable Issue Fields', editableIssueFields(null), []],
    ['null user: allowed Issue Statuses', allowedIssueStatuses(null), []],

];

let failed = 0;

for (const [name, actual, expected] of rows) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    if (!ok) {
        failed++;
        console.log('✖', name, '| expected ', JSON.stringify(expected), ' got ', JSON.stringify(actual));
    } else {
        console.log('✔', name);
    }
}

console.log(failed ? `\n${failed} of ${rows.length} failed` : `\nall ${rows.length} passed`);
process.exit(failed ? 1 : 0);

