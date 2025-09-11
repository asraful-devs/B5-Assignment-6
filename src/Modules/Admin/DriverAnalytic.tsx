import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useGetAllUsersQuery } from '../../Redux/Features/Auth/auth.api';
import { useGetDailyEarningsQuery } from '../../Redux/Features/Driver/driver.api';
import { useGetAllRideQuery } from '../../Redux/Features/Ride/ride.api';
import NavigateHome from '../../Utils/NavigateHome';

const DriverAnalytic = () => {
    const { data: allUsersData } = useGetAllUsersQuery(undefined);
    const { data: dailyEarningsData } = useGetDailyEarningsQuery(undefined);
    const { data, isLoading } = useGetAllRideQuery(undefined);
    const rides = data?.data?.result || [];

    if (isLoading) {
        return (
            <div className='p-6 text-center text-gray-500'>
                Loading Driver analytics...
            </div>
        );
    }

    if (!rides || rides.length === 0) {
        return (
            <div className='p-6 text-center text-gray-500'>
                No rides found 🚫
            </div>
        );
    }

    // Stats
    const completedRides = rides.filter(
        (r: { status: string }) => r.status === 'COMPLETED'
    ).length;
    const totalPayment = rides.reduce(
        (sum: number, ride: { status: string; payment: number }) =>
            ride.status !== 'CANCELLED' ? sum + (ride.payment || 0) : sum,
        0
    );

    const users = allUsersData?.data || [];
    const driver = users.filter(
        (user: { role: string }) => user.role === 'DRIVER'
    ).length;

    const activeDrivers = users.filter(
        (user: { role: string; isActive: string }) =>
            user.role === 'DRIVER' && user.isActive === 'ACTIVE'
    ).length;
    const inactiveDrivers = users.filter(
        (user: { role: string; isActive: string }) =>
            user.role === 'DRIVER' && user.isActive === 'INACTIVE'
    ).length;
    const deletedDrivers = users.filter(
        (user: { role: string; isDeleted: boolean }) =>
            user.role === 'DRIVER' && user.isDeleted === true
    ).length;

    const driverStatusData = [
        { name: 'Active', value: activeDrivers },
        { name: 'Inactive', value: inactiveDrivers },
        { name: 'Deleted', value: deletedDrivers },
    ];

    const dailyEarnings = dailyEarningsData?.data || [];
    const earningsData = dailyEarnings.map(
        (item: { _id: string; earnings: number }) => ({
            date: item._id,
            earnings: item.earnings,
        })
    );

    return (
        <div className='p-6 space-y-8'>
            <div className=''>
                <NavigateHome />
            </div>
            <h1 className='text-3xl font-bold text-center'>Driver Analytics</h1>

            {/* Top Stat Cards */}
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4'>
                <Card>
                    <CardContent>
                        <p>Total Drivers</p>
                        <h2 className='text-2xl font-bold'>{driver}</h2>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <p>Active Drivers</p>
                        <h2 className='text-2xl font-bold text-green-600'>
                            {activeDrivers}
                        </h2>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <p>Completed Rides</p>
                        <h2 className='text-2xl font-bold'>{completedRides}</h2>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <p>Total Earnings</p>
                        <h2 className='text-2xl font-bold text-blue-600'>
                            ${totalPayment.toLocaleString()}
                        </h2>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className='grid gap-6 md:grid-cols-2'>
                {/* Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Driver Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className='h-[300px] sm:h-[400px]'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <PieChart>
                                <Pie
                                    data={driverStatusData}
                                    dataKey='value'
                                    nameKey='name'
                                    cx='50%'
                                    cy='50%'
                                    outerRadius='80%'
                                    label
                                >
                                    {driverStatusData.map((_entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                [
                                                    '#22c55e',
                                                    '#facc15',
                                                    '#ef4444',
                                                ][index]
                                            }
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Line Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Earnings Over Time</CardTitle>
                    </CardHeader>
                    <CardContent className='h-[300px] sm:h-[400px]'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <LineChart data={earningsData}>
                                <XAxis dataKey='date' />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type='monotone'
                                    dataKey='earnings'
                                    stroke='#22c55e'
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DriverAnalytic;
