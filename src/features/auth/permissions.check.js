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
const ownIssue = { createdAt: { id: 'm1' }, assignedTo: { id: 'm1' } };
// the lead created it and assigned it to m1
const assignedByLead = { createdAt: { id: 'l1' }, assignedTo: { id: 'm1' } };
// m1 created it but did not assign it (handed to the lead)
const unassigned = { createdAt: { id: 'm1' }, assignedTo: null };
// same as ownIssue, but ids arrive as plain strings, not populated objects
const ownIssueIds = { createdAt: 'm1', assignedTo: 'm1' };

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


    // ---- Issues: create / delete ----


    // ---- Issues: edit (relationship rule) ----


    // ---- Issues: change status (relationship rule) ----


    // ---- Issues: lists ----


    // ---- Comments ----


    // ---- Safety: missing user / missing record never crashes ----

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

