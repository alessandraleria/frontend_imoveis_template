// assets
import { IconDashboard } from '@tabler/icons';
import { IconMessageCircle2 } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconMessageCircle2 };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'default',
            title: 'Chat',
            type: 'item',
            url: '/join',
            icon: icons.IconMessageCircle2,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
