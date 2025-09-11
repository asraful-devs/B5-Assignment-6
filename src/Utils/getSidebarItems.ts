import { role } from '../Constants/role';
import { adminSidebarItems } from '../Routes/adminSidebarItems';
import { driverSidebarItems } from '../Routes/driverSidebarItems';
import { riderSidebarItems } from '../Routes/riderSideBarItems';
import type { TRole } from '../Types/Index';

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.admin:
            return [...adminSidebarItems];
        case role.rider:
            return [...riderSidebarItems];
        case role.driver:
            return [...driverSidebarItems];
        default:
            return [];
    }
};
