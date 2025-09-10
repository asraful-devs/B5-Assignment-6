import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NavigateHome from '../../Utils/NavigateHome';
// import { useGetDriverAnalyticsQuery } from '../../../Redux/Features/Ride/ride.api';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {
    useGetDailyEarningsQuery,
    useGetEarningsQuery,
    useGetMyPickQuery,
} from '../../Redux/Features/Driver/driver.api';
import type { Ride } from '../../Types/ride';

type Analytics = {
    completedRides: number;
    cancelledRides: number;
    pickedRides: number;
};

const DriverAnalytics = () => {
    const { data: earnings } = useGetEarningsQuery(undefined);
    const { data: dailyEarnings } = useGetDailyEarningsQuery(undefined);
    const { data: pickData } = useGetMyPickQuery(undefined);

    console.log('Earnings Data:', earnings);
    console.log('Daily Earnings Data:', dailyEarnings);
    // console.log('Picked Rides Data:', pickData);

    const dailyIncome = 100;
    const weeklyIncome = dailyIncome * 7;
    const monthlyIncome = dailyIncome * 30;

    const analytics = pickData?.data?.reduce(
        (acc: Analytics, ride: Ride) => {
            switch (ride.status) {
                case 'COMPLETED':
                    acc.completedRides += 1;
                    break;
                case 'CANCELLED':
                    acc.cancelledRides += 1;
                    break;
                case 'PICKED':
                    acc.pickedRides += 1;
                    break;
            }
            return acc;
        },
        { completedRides: 0, cancelledRides: 0, ongoingRides: 0 }
    );

    const ridesData = [
        { name: 'Completed', value: analytics?.completedRides || 0 },
        { name: 'Cancelled', value: analytics?.cancelledRides || 0 },
        { name: 'Picked', value: analytics?.pickedRides || 0 },
    ];

    const COLORS = ['#22c55e', '#ef4444', '#3b82f6']; // green, red, blue

    const rideStats = [
        { type: 'Completed', count: analytics.completedRides || 0 },
        { type: 'Cancelled', count: analytics.cancelledRides || 0 },
        { type: 'Picked', count: analytics.pickedRides || 0 },
    ];

    return (
        <div className='p-6 space-y-6'>
            <NavigateHome />

            {/* Income Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Income</CardTitle>
                    </CardHeader>
                    <CardContent className='text-2xl font-bold text-green-600'>
                        ৳ {dailyIncome || 0}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Income</CardTitle>
                    </CardHeader>
                    <CardContent className='text-2xl font-bold text-blue-600'>
                        ৳ {weeklyIncome || 0}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Income</CardTitle>
                    </CardHeader>
                    <CardContent className='text-2xl font-bold text-purple-600'>
                        ৳ {monthlyIncome || 0}
                    </CardContent>
                </Card>
            </div>

            {/* Ride Overview */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* PieChart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ride Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={ridesData}
                                dataKey='value'
                                nameKey='name'
                                cx='50%'
                                cy='50%'
                                outerRadius={100}
                                label
                            >
                                {ridesData.map((_entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </CardContent>
                </Card>

                {/* BarChart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ride Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className='h-[300px]'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <BarChart data={rideStats}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='type' />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey='count' fill='#3b82f6' />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DriverAnalytics;
