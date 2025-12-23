import AllDriver from '../Modules/Admin/AllDriver';
import AllRider from '../Modules/Admin/AllRider';
import AllUser from '../Modules/Admin/AllUser';
import Analytics from '../Modules/Admin/Analytics';
import ContactMessages from '../Modules/Admin/ContactMessages';
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
                url: '/dashboard/admin/analytics',
                component: Analytics,
            },
            {
                title: 'Me',
                url: '/dashboard/admin/me',
                component: MePage,
            },
        ],
    },

    {
        title: 'Get User Details',
        items: [
            {
                title: 'All Users',
                url: '/dashboard/admin/all-users',
                component: AllUser,
            },
            {
                title: 'All Drivers',
                url: '/dashboard/admin/all-drivers',
                component: AllDriver,
            },
            {
                title: 'All Riders',
                url: '/dashboard/admin/all-riders',
                component: AllRider,
            },
        ],
    },

    {
        title: 'Rider',
        items: [
            {
                title: 'Ride Analytics',
                url: '/dashboard/admin/ride-analytics',
                component: RideAnalytics,
            },
            {
                title: 'All Riders',
                url: '/dashboard/admin/all-riders',
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
                url: '/dashboard/admin/driver-analytics',
                component: DriverAnalytic,
            },
            {
                title: 'All Drivers',
                url: '/dashboard/admin/all-drivers',
                component: AllDriver,
            },
        ],
    },
    {
        title: 'Contact Messages',
        items: [
            {
                title: 'Contact Messages',
                url: '/dashboard/admin/contact-messages',
                component: ContactMessages,
            },
        ],
    },
];
