import CreateRideDashboard from '../Modules/Ride/CreateRideDashboard';
import GetCompletedRide from '../Modules/Ride/GetCompletedRide';
import GetMyRide from '../Modules/Ride/GetMyRide';
import RiderAnalytics from '../Modules/Ride/RiderAnalytics';
import MePage from '../Page/MePage';
import type { ISidebarItem } from '../Types/Index';

export const riderSidebarItems: ISidebarItem[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Analytics',
                url: '/dashboard/rider/analytics',
                component: RiderAnalytics,
            },
            {
                title: 'Create Ride',
                url: '/dashboard/rider/create-ride',
                component: CreateRideDashboard,
            },
            {
                title: 'Get Rides',
                url: '/dashboard/rider/get-rides',
                component: GetMyRide,
            },
            {
                title: 'Get Completed Rides',
                url: '/dashboard/rider/get-completed-rides',
                component: GetCompletedRide,
            },
            {
                title: 'Me',
                url: '/dashboard/rider/me',
                component: MePage,
            },
        ],
    },
];
