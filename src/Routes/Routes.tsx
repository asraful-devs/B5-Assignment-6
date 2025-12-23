import { createBrowserRouter, Navigate } from 'react-router';
import App from '../App';
import { role } from '../Constants/role';
import DashboardLayout from '../Layout/DashboardLayout';
import AboutPage from '../Page/AboutPage';
import AchievementsPage from '../Page/AchievementsPage';
import DrivePage from '../Page/DrivePage';
import FAQPage from '../Page/FAQPage';
import FeaturesPage from '../Page/FeaturesPage';
import HomePage from '../Page/HomePage';
import LoginPage from '../Page/LoginPage';
import OurTeam from '../Page/OurTeam';
import PricePage from '../Page/PricePage';
import RegisterPage from '../Page/RegisterPage';
import RidePage from '../Page/RidePage';
import UnauthorizedPage from '../Page/UnauthorizedPage';
import type { TRole } from '../Types/Index';
import { generateRoutes } from '../Utils/generateRoutes';
import { withAuth } from '../Utils/withAuth';
import { adminSidebarItems } from './adminSidebarItems';
import DrivePrivateRoute from './DrivePrivateRoute';
import { driverSidebarItems } from './driverSidebarItems';
import RidePrivateRoute from './RidePrivateRoute';
import { riderSidebarItems } from './riderSideBarItems';

export const router = createBrowserRouter([
    {
        Component: App,
        path: '/',
        children: [
            {
                Component: HomePage,
                index: true,
            },
            {
                Component: FeaturesPage,
                path: 'features',
            },
            {
                Component: AboutPage,
                path: 'about',
            },
            {
                Component: OurTeam,
                path: 'about/our-team',
            },
            {
                Component: FAQPage,
                path: 'about/faq',
            },
            {
                Component: AchievementsPage,
                path: 'about/achievements',
            },
            {
                Component: PricePage,
                path: 'about/prices-plans',
            },
            {
                Component: UnauthorizedPage,
                path: 'unauthorized',
            },
            {
                Component: RidePrivateRoute,
                children: [
                    {
                        Component: RidePage,
                        path: 'ride',
                    },
                ],
            },
            {
                Component: DrivePrivateRoute,
                children: [
                    {
                        Component: DrivePage,
                        path: 'drive',
                    },
                ],
            },
        ],
    },
    {
        Component: withAuth(DashboardLayout, role.admin as TRole),
        path: '/dashboard/admin',
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard/admin/analytics' />,
            },
            ...generateRoutes(adminSidebarItems),
        ],
    },
    {
        Component: withAuth(DashboardLayout, role.rider as TRole),
        path: '/dashboard/rider',
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard/rider/analytics' />,
            },
            ...generateRoutes(riderSidebarItems),
        ],
    },
    {
        Component: withAuth(DashboardLayout, role.driver as TRole),
        path: '/dashboard/driver',
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard/driver/analytics' />,
            },
            ...generateRoutes(driverSidebarItems),
        ],
    },
    {
        Component: LoginPage,
        path: '/login',
    },
    {
        Component: RegisterPage,
        path: '/register',
    },
]);
