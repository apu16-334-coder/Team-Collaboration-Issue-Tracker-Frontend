export const navConfig = [
    { label: 'Dashboard', to: '/dashboard', roles: ['admin', 'team_lead', 'member'] },
    { label: 'Users', to: '/users', roles: 'admin' },
    { label: 'Teams', to: '/teams', roles: ['admin', 'team_lead', 'member'] },
    { label: 'Projects', to: '/projects', roles: ['admin'] },
    { label: 'Profile', to: '/profile', roles: ['admin', 'team_lead', 'member'] },
];