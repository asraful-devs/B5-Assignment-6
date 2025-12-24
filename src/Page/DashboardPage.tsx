import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PaymentHistory from '@/Modules/Payment/PaymentHistory';
import PaymentPending from '@/Modules/Payment/PaymentPending';
import RidesWithPayment from '@/Modules/Payment/RidesWithPayment';
import { Clock, CreditCard, History } from 'lucide-react';
import { Outlet } from 'react-router';

const DashboardPage = () => {
    return (
        <div className='min-h-screen bg-gray-50 py-4 md:py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* ✅ Header section */}
                <div className='mb-6'>
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                        My Dashboard
                    </h1>
                    <p className='text-sm md:text-base text-gray-600 mt-1'>
                        Manage your rides and payments
                    </p>
                </div>

                <Tabs defaultValue='rides' className='w-full'>
                    {/* ✅ Tab list - Responsive */}
                    <TabsList className='grid w-full grid-cols-2 md:grid-cols-3 mb-6 bg-white border border-gray-200 p-1 rounded-lg'>
                        {/* Tab 1: My Rides */}
                        <TabsTrigger
                            value='rides'
                            className='flex items-center gap-1 md:gap-2 text-xs md:text-sm'
                        >
                            <Clock className='w-4 h-4' />
                            <span className='hidden sm:inline'>Rides</span>
                            <span className='sm:hidden'>Rides</span>
                        </TabsTrigger>

                        {/* Tab 2: Pending Payments */}
                        <TabsTrigger
                            value='pending'
                            className='flex items-center gap-1 md:gap-2 text-xs md:text-sm'
                        >
                            <CreditCard className='w-4 h-4' />
                            <span className='hidden sm:inline'>Pending</span>
                            <span className='sm:hidden'>Pay</span>
                        </TabsTrigger>

                        {/* Tab 3: Payment History */}
                        <TabsTrigger
                            value='history'
                            className='flex items-center gap-1 md:gap-2 text-xs md:text-sm'
                        >
                            <History className='w-4 h-4' />
                            <span className='hidden sm:inline'>History</span>
                            <span className='sm:hidden'>Done</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='rides' className='space-y-4'>
                        <RidesWithPayment />
                    </TabsContent>

                    <TabsContent value='pending' className='space-y-4'>
                        <PaymentPending />
                    </TabsContent>

                    <TabsContent value='history' className='space-y-4'>
                        <PaymentHistory />
                    </TabsContent>
                </Tabs>

                <Outlet />
            </div>
        </div>
    );
};

export default DashboardPage;
