import { Card } from '@/components/ui/card';
import { Car, TrendingUp, UserCheck, Users } from 'lucide-react';
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import {
    useGetAllDriversQuery,
    useGetAllRidersQuery,
    useGetAllUsersQuery,
} from '../../Redux/Features/Auth/auth.api';

const OverView = () => {
    const { data: allUsersData, isLoading: usersLoading } =
        useGetAllUsersQuery(undefined);
    const { data: driversData, isLoading: driversLoading } =
        useGetAllDriversQuery(undefined);
    const { data: ridersData, isLoading: ridersLoading } =
        useGetAllRidersQuery(undefined);

    const allUsers = allUsersData?.data || [];
    const drivers = driversData?.data || [];
    const riders = ridersData?.data || [];
    const totalUsers = allUsers.length;

    const isLoading = usersLoading || driversLoading || ridersLoading;

    // Pie chart data
    const pieChartData = [
        {
            name: 'Drivers',
            value: drivers.length,
        },
        {
            name: 'Riders',
            value: riders.length,
        },
    ];

    const COLORS = ['#10b981', '#3b82f6'];

    // Stat Cards
    const stats = [
        {
            title: 'Total Users',
            value: totalUsers,
            icon: Users,
            color: 'bg-blue-50 dark:bg-blue-950',
            iconColor: 'text-blue-600 dark:text-blue-400',
        },
        {
            title: 'Total Drivers',
            value: drivers.length,
            icon: Car,
            color: 'bg-green-50 dark:bg-green-950',
            iconColor: 'text-green-600 dark:text-green-400',
        },
        {
            title: 'Total Riders',
            value: riders.length,
            icon: UserCheck,
            color: 'bg-purple-50 dark:bg-purple-950',
            iconColor: 'text-purple-600 dark:text-purple-400',
        },
        {
            title: 'Active Rate',
            value: `${
                totalUsers > 0
                    ? Math.round(
                          ((drivers.length + riders.length) / totalUsers) * 100
                      )
                    : 0
            }%`,
            icon: TrendingUp,
            color: 'bg-orange-50 dark:bg-orange-950',
            iconColor: 'text-orange-600 dark:text-orange-400',
        },
    ];

    if (isLoading) {
        return (
            <div className='flex items-center justify-center py-12'>
                <p className='text-muted-foreground'>Loading overview...</p>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='space-y-2'>
                <h2 className='text-3xl font-bold'>Overview</h2>
                <p className='text-muted-foreground'>
                    System statistics and key metrics
                </p>
            </div>

            {/* Stat Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className='p-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>
                                        {stat.title}
                                    </p>
                                    <p className='text-3xl font-bold mt-2'>
                                        {stat.value}
                                    </p>
                                </div>
                                <div
                                    className={`${stat.color} p-3 rounded-lg flex items-center justify-center`}
                                >
                                    <Icon
                                        className={`w-6 h-6 ${stat.iconColor}`}
                                    />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Pie Chart */}
                <Card className='p-6'>
                    <h3 className='text-lg font-semibold mb-4'>
                        User Distribution
                    </h3>
                    {drivers.length + riders.length > 0 ? (
                        <ResponsiveContainer width='100%' height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx='50%'
                                    cy='50%'
                                    labelLine={false}
                                    label={({ name, value }) =>
                                        `${name}: ${value}`
                                    }
                                    outerRadius={80}
                                    fill='#8884d8'
                                    dataKey='value'
                                >
                                    {pieChartData.map((_entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className='h-72 flex items-center justify-center text-muted-foreground'>
                            <p>No data available</p>
                        </div>
                    )}
                </Card>

                {/* Summary Info */}
                <Card className='p-6'>
                    <h3 className='text-lg font-semibold mb-4'>Summary</h3>
                    <div className='space-y-4'>
                        <div className='flex justify-between items-center pb-3 border-b'>
                            <span className='text-sm font-medium text-muted-foreground'>
                                Total Users
                            </span>
                            <span className='text-2xl font-bold'>
                                {totalUsers}
                            </span>
                        </div>
                        <div className='flex justify-between items-center pb-3 border-b'>
                            <span className='text-sm font-medium text-muted-foreground'>
                                Drivers
                            </span>
                            <span className='text-2xl font-bold text-green-600'>
                                {drivers.length}
                            </span>
                        </div>
                        <div className='flex justify-between items-center pb-3 border-b'>
                            <span className='text-sm font-medium text-muted-foreground'>
                                Riders
                            </span>
                            <span className='text-2xl font-bold text-blue-600'>
                                {riders.length}
                            </span>
                        </div>
                        <div className='flex justify-between items-center pt-2'>
                            <span className='text-sm font-medium text-muted-foreground'>
                                Ratio
                            </span>
                            <span className='text-sm font-semibold'>
                                {drivers.length}:{riders.length}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Stats */}
            <Card className='p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0'>
                <h3 className='text-lg font-semibold mb-4'>Quick Stats</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                    <div>
                        <p className='text-muted-foreground mb-1'>
                            Avg Users/Day
                        </p>
                        <p className='text-2xl font-bold'>
                            {Math.ceil(totalUsers / 30)}
                        </p>
                    </div>
                    <div>
                        <p className='text-muted-foreground mb-1'>
                            Driver Rate
                        </p>
                        <p className='text-2xl font-bold'>
                            {totalUsers > 0
                                ? Math.round(
                                      (drivers.length / totalUsers) * 100
                                  )
                                : 0}
                            %
                        </p>
                    </div>
                    <div>
                        <p className='text-muted-foreground mb-1'>Rider Rate</p>
                        <p className='text-2xl font-bold'>
                            {totalUsers > 0
                                ? Math.round((riders.length / totalUsers) * 100)
                                : 0}
                            %
                        </p>
                    </div>
                    <div>
                        <p className='text-muted-foreground mb-1'>
                            Active Users
                        </p>
                        <p className='text-2xl font-bold'>
                            {drivers.length + riders.length}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default OverView;
