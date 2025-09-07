import DriverAnalytics from '../Modules/Drive/DriverAnalytics';
import type { ISidebarItem } from '../Types/Index';

export const driverSidebarItems: ISidebarItem[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Analytics',
                url: '/dashboard/driver/analytics',
                component: DriverAnalytics,
            },
        ],
    },
];
