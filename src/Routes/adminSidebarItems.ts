import AllDriver from '../Modules/Admin/AllDriver';
import AllRider from '../Modules/Admin/AllRider';
import AllUser from '../Modules/Admin/AllUser';
import Analytics from '../Modules/Admin/Analytics';
import DriverAnalytic from '../Modules/Admin/DriverAnalytic';
import RideAnalytics from '../Modules/Admin/RideAnalytic';
import MePage from '../Page/MePage';
import type { ISidebarItem } from '../Types/Index';

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Analytics',
                url: '/dashboard/analytics',
                component: Analytics,
            },
            {
                title: 'Me',
                url: '/dashboard/me',
                component: MePage,
            },
        ],
    },

    {
        title: 'Get User Details',
        items: [
            {
                title: 'All Users',
                url: '/dashboard/all-users',
                component: AllUser,
            },
            {
                title: 'All Drivers',
                url: '/dashboard/all-drivers',
                component: AllDriver,
            },
            {
                title: 'All Riders',
                url: '/dashboard/all-riders',
                component: AllRider,
            },
        ],
    },

    {
        title: 'Rider',
        items: [
            {
                title: 'Ride Analytics',
                url: '/dashboard/ride-analytics',
                component: RideAnalytics,
            },
            {
                title: 'All Riders',
                url: '/dashboard/all-riders',
                component: AllRider,
            },
            // {
            //     title: 'Create Ride',
            //     url: '/dashboard/create-ride',
            //     component: CreateRide,
            // },
            // {
            //     title: 'Get My Ride',
            //     url: '/dashboard/get-my-ride',
            //     component: GetMyRide,
            // },
            // {
            //     title: 'Get Completed Ride',
            //     url: '/dashboard/get-completed-ride',
            //     component: GetCompletedRide,
            // },
        ],
    },

    {
        title: 'Driver',
        items: [
            {
                title: 'Driver Analytics',
                url: '/dashboard/driver-analytics',
                component: DriverAnalytic,
            },
            {
                title: 'All Drivers',
                url: '/dashboard/all-drivers',
                component: AllDriver,
            },
        ],
    },
];
