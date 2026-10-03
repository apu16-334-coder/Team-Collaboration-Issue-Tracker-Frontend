export const navConfig = [
    { label: 'Dashboard', to: '/dashboard', roles: ['admin', 'teamLead', 'member'] },
    { label: 'Users', to: '/users', roles: 'admin' },
    { label: 'Teams', to: '/teams', roles: ['admin', 'teamLead', 'member'] },
    { label: 'Projects', to: '/projects', roles: ['admin']},
    { label: 'Profile', to: '/profile', roles: ['admin', 'teamLead', 'member'] },
];