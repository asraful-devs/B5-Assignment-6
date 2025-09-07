import Logo from '@/assets/Images/Logo/logo (2).png';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from 'react-router';
import { role } from '../../Constants/role';
import {
    authApi,
    useLogoutMutation,
    useUserInfoQuery,
} from '../../Redux/Features/Auth/auth.api';
import { useAppDispatch } from '../../Redux/hooks';
import { ModeToggle } from './mode-toggle';

const navigationLinks = [
    { href: '/', label: 'Home', role: 'PUBLIC' },
    { href: '/ride', label: 'Ride', role: role.rider },
    { href: '/drive', label: 'Drive', role: role.driver },
    { href: '/features', label: 'Features', role: 'PUBLIC' },
    { href: '/faq', label: 'FAQ', role: 'PUBLIC' },
    { href: '/about', label: 'About Us', role: 'PUBLIC' },
    { href: '/me', label: 'Me', role: 'USER' },
    { href: '/dashboard', label: 'Dashboard', role: 'USER' },
];

export default function Navbar() {
    const { data } = useUserInfoQuery(undefined);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const user = data?.data?.data;
    const isLoggedIn = !!user?.email;

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState());
    };

    const filteredLinks = navigationLinks
        .filter((link) => {
            if (
                (link.href === '/me' || link.href === '/dashboard') &&
                !isLoggedIn
            ) {
                return false;
            }
            return true;
        })
        .map((link) => {
            if (link.href === '/dashboard') {
                if (user?.role === role.admin) {
                    return {
                        ...link,
                        href: '/dashboard/admin',
                        label: 'Dashboard',
                    };
                }
                if (user?.role === role.rider) {
                    return {
                        ...link,
                        href: '/dashboard/rider',
                        label: 'Dashboard',
                    };
                }
                if (user?.role === role.driver) {
                    return {
                        ...link,
                        href: '/dashboard/driver',
                        label: 'Dashboard',
                    };
                }
                return null;
            }
            return link;
        })
        .filter(Boolean);

    return (
        <header className='border-b px-4 md:px-6 bg-background sticky top-0 z-50'>
            <div className='flex h-16 justify-between items-center gap-4'>
                <div className='flex items-center gap-4'>
                    <Link to='/' className='flex items-center gap-2'>
                        <img src={Logo} alt='Logo' className='w-16 h-16' />
                    </Link>

                    <NavigationMenu className='hidden md:flex h-full'>
                        <NavigationMenuList className='flex gap-4 h-full'>
                            {filteredLinks.map((link, idx) =>
                                link ? (
                                    <NavigationMenuItem key={idx}>
                                        <NavigationMenuLink
                                            asChild
                                            className='text-muted-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors px-2 py-1 font-medium'
                                        >
                                            <Link to={link.href}>
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ) : null
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className='flex items-center gap-2'>
                    <ModeToggle />
                    {isLoggedIn ? (
                        <Button
                            onClick={handleLogout}
                            variant='outline'
                            size='sm'
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button asChild size='sm'>
                            <Link to='/login'>Login</Link>
                        </Button>
                    )}
                </div>

                <div className='flex md:hidden'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant='ghost' size='icon'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-48 p-2'>
                            <NavigationMenu className='w-full'>
                                <NavigationMenuList className='flex flex-col gap-2'>
                                    {filteredLinks.map((link, idx) => (
                                        <NavigationMenuItem key={idx}>
                                            <NavigationMenuLink
                                                asChild
                                                className='block px-2 py-1 text-sm hover:text-primary'
                                            >
                                                {link && (
                                                    <Link to={link.href}>
                                                        {link.label}
                                                    </Link>
                                                )}
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </header>
    );
}
