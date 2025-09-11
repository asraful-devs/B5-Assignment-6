import DriverAnalytics from '../Modules/Drive/DriverAnalytics';
import GetAvailableRide from '../Modules/Drive/getAvailableRide';
import GetMyPick from '../Modules/Drive/GetMyPick';
import MePage from '../Page/MePage';
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
            {
                title: 'Get Available Rides',
                url: '/dashboard/driver/get-available-rides',
                component: GetAvailableRide,
            },
            {
                title: 'Get My Picked Rides',
                url: '/dashboard/driver/get-my-picked-rides',
                component: GetMyPick,
            },
            {
                title: 'Me',
                url: '/dashboard/driver/me',
                component: MePage,
            },
        ],
    },
];
