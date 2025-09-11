import { Minus, Plus } from 'lucide-react';
import * as React from 'react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { Link } from 'react-router';
import logo from '../assets/Images/Logo/logo (2).png';
import { useUserInfoQuery } from '../Redux/Features/Auth/auth.api';
import { adminSidebarItems } from '../Routes/adminSidebarItems';
import { driverSidebarItems } from '../Routes/driverSidebarItems';
import { riderSidebarItems } from '../Routes/riderSideBarItems';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
    const user = userInfo?.data?.data;
    const role = user?.role;

    // sidebarItems সেট করা role অনুযায়ী
    let sidebarItems: typeof adminSidebarItems = [];

    if (role === 'ADMIN' || role === role.admin) {
        sidebarItems = adminSidebarItems;
    } else if (role === 'DRIVER' || role === role.driver) {
        sidebarItems = driverSidebarItems;
    } else if (role === 'RIDER' || role === role.rider) {
        sidebarItems = riderSidebarItems;
    }

    // loading হলে fallback
    if (isLoading) {
        return <div>Loading sidebar...</div>;
    }

    return (
        <Sidebar {...props}>
            <div className='flex items-center justify-center'>
                <img src={logo} alt='Logo' className='w-30 h-30' />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {sidebarItems.map((item, index) => (
                            <Collapsible
                                key={item.title}
                                defaultOpen={index === 0}
                                className='group/collapsible'
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            {item.title}
                                            <Plus className='ml-auto group-data-[state=open]/collapsible:hidden' />
                                            <Minus className='ml-auto group-data-[state=closed]/collapsible:hidden' />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {item.items?.length ? (
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <Link
                                                                to={subItem.url}
                                                            >
                                                                {subItem.title}
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    ) : null}
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
