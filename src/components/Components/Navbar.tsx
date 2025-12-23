// import Logo from '@/components/logo';
// import Logo from '@/assets/Images/Logo/Logo.png';
// import Logo from '@/assets/Images/Logo/logo (1).png';
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
import { useState } from 'react';
import { Link } from 'react-router';
import { role } from '../../Constants/role';
import {
    authApi,
    useLogoutMutation,
    useUserInfoQuery,
} from '../../Redux/Features/Auth/auth.api';
import { useAppDispatch } from '../../Redux/hooks';
import { ModeToggle } from './mode-toggle';

// navigation link
const navigationLinks = [
    { href: '/', label: 'Home', role: 'PUBLIC' },
    { href: '/ride', label: 'Ride', role: role.rider },
    { href: '/drive', label: 'Drive', role: role.driver },
    { href: '/features', label: 'Features', role: 'PUBLIC' },
];

// Mega Menu for About
const aboutMenuItems = [
    {
        href: '/about',
        label: 'About Me',
        description: 'Learn about Me and my journey',
    },
    {
        href: '/about/our-team',
        label: 'Our Team',
        description: 'Meet our team members',
    },
    {
        href: '/about/faq',
        label: 'FAQ',
        description: 'Frequently asked questions',
    },
    {
        href: '/about/achievements',
        label: 'Achievements',
        description: 'Our milestones',
    },
    {
        href: '/about/prices-plans',
        label: 'Prices & Plans',
        description: 'Our milestones',
    },
];

export default function Navbar() {
    const { data } = useUserInfoQuery(undefined);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const user = data?.data?.data;
    const isLoggedIn = !!user?.email;

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState());
    };

    const filteredLinks = navigationLinks.filter((link) => {
        if (link.href === '/dashboard' && !isLoggedIn) {
            return false;
        }
        return true;
    });

    return (
        <header className='border-b px-4 md:px-6'>
            <div className='flex h-16 justify-between gap-4'>
                {/* Left side */}
                <div className='flex gap-2'>
                    <div className='flex items-center md:hidden'>
                        {/* Mobile menu trigger */}
                        <Popover
                            open={isMobileOpen}
                            onOpenChange={setIsMobileOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    className='group size-8'
                                    variant='ghost'
                                    size='icon'
                                >
                                    <svg
                                        className='pointer-events-none'
                                        width={16}
                                        height={16}
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M4 12L20 12'
                                            className='origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]'
                                        />
                                        <path
                                            d='M4 12H20'
                                            className='origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45'
                                        />
                                        <path
                                            d='M4 12H20'
                                            className='origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]'
                                        />
                                    </svg>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align='start'
                                className='w-36 p-1 md:hidden'
                            >
                                <NavigationMenu className='max-w-none *:w-full'>
                                    <NavigationMenuList className='flex-col items-start gap-0 md:gap-2'>
                                        {filteredLinks.map((link, index) => (
                                            <NavigationMenuItem
                                                key={index}
                                                className='w-full'
                                            >
                                                <NavigationMenuLink
                                                    href={link.href}
                                                    className='py-1.5'
                                                >
                                                    {link.label}
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        ))}

                                        {/* Mobile About Dropdown */}
                                        <div className='w-full border-t mt-2 pt-2'>
                                            <p className='text-sm font-medium px-3 py-1.5 text-muted-foreground flex items-center gap-2'>
                                                <svg
                                                    width={16}
                                                    height={16}
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeWidth='2'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                >
                                                    <polyline points='6 9 12 15 18 9' />
                                                </svg>
                                                About & Info
                                            </p>
                                            {aboutMenuItems.map((item, idx) => (
                                                <NavigationMenuItem
                                                    key={idx}
                                                    className='w-full ml-2'
                                                >
                                                    <NavigationMenuLink
                                                        href={item.href}
                                                        className='py-1.5 text-sm'
                                                    >
                                                        {item.label}
                                                    </NavigationMenuLink>
                                                </NavigationMenuItem>
                                            ))}
                                        </div>

                                        {/* Mobile Me & Dashboard */}
                                        {isLoggedIn && (
                                            <NavigationMenuItem className='w-full'>
                                                <NavigationMenuLink
                                                    href='/dashboard'
                                                    className='py-1.5'
                                                >
                                                    Dashboard
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        )}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {/* Main nav */}
                    <div className='flex items-center gap-6'>
                        <a
                            href='#'
                            className='text-primary hover:text-primary/90'
                        >
                            <img src={Logo} alt='Logo' className='w-20 h-20' />
                        </a>
                        {/* Navigation menu */}
                        <NavigationMenu className='h-full *:h-full max-md:hidden'>
                            <NavigationMenuList className='h-full gap-2'>
                                {filteredLinks.map((link, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className='h-full'
                                    >
                                        <NavigationMenuLink
                                            href={link.href}
                                            className='text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!'
                                        >
                                            {link.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                                {/* About Mega Menu */}
                                <NavigationMenuItem className='h-full'>
                                    <Popover
                                        open={isAboutOpen}
                                        onOpenChange={setIsAboutOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <button className='text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 px-3 font-medium hover:bg-transparent text-sm inline-flex items-center gap-1.5'>
                                                About Us
                                                <svg
                                                    width={14}
                                                    height={14}
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeWidth='2'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    className={`transition-transform duration-200 ${
                                                        isAboutOpen
                                                            ? 'rotate-180'
                                                            : ''
                                                    }`}
                                                >
                                                    <polyline points='6 9 12 15 18 9' />
                                                </svg>
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className='w-72 p-4'
                                            align='start'
                                        >
                                            <div className='grid gap-4'>
                                                <div className='space-y-2'>
                                                    <h4 className='font-bold text-sm leading-none'>
                                                        About & Information
                                                    </h4>
                                                    <p className='text-xs text-muted-foreground'>
                                                        Explore our company and
                                                        resources
                                                    </p>
                                                </div>
                                                <div className='grid gap-2'>
                                                    {aboutMenuItems.map(
                                                        (item, idx) => (
                                                            <a
                                                                key={idx}
                                                                href={item.href}
                                                                className='group block space-y-1 rounded-md p-3 hover:bg-accent transition-colors'
                                                            >
                                                                <p className='text-sm font-medium leading-none group-hover:text-primary'>
                                                                    {item.label}
                                                                </p>
                                                                <p className='text-xs text-muted-foreground'>
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p>
                                                            </a>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </NavigationMenuItem>

                                {/* Dashboard & Me Menu */}
                                {isLoggedIn && (
                                    <NavigationMenuItem className='h-full'>
                                        <NavigationMenuLink
                                            href='/dashboard'
                                            className='text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 px-3 font-medium hover:bg-transparent data-[active]:bg-transparent!'
                                        >
                                            Dashboard
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                {/* Right side */}
                <div className='flex items-center gap-2'>
                    <Button asChild size='sm' className='text-sm'>
                        <ModeToggle />
                    </Button>
                    {isLoggedIn ? (
                        <Button
                            onClick={handleLogout}
                            variant='outline'
                            className='text-sm'
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button asChild className='text-sm'>
                            <Link to='/login'>Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
