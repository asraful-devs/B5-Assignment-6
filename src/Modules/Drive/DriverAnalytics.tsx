import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    useGetMyPickQuery,
} from '../../Redux/Features/Driver/driver.api';
import type { Ride } from '../../Types/ride';
import NavigateHome from '../../Utils/NavigateHome';

type Analytics = {
    completedRides: number;
    cancelledRides: number;
    pickedRides: number;
};

const DriverAnalytics = () => {
    const { data: dailyEarnings, isLoading: dailyLoading } =
        useGetDailyEarningsQuery(undefined);
    const { data: pickData, isLoading: pickLoading } =
        useGetMyPickQuery(undefined);

    const today = new Date().toISOString().split('T')[0];
    // console.log(today);

    const dailyIncome =
        dailyEarnings?.data?.find((item: { _id: string }) => item._id === today)
            ?.earnings ?? 0;

    const total = dailyEarnings?.data?.reduce(
        (sum: number, item: { earnings: number }) => sum + (item.earnings || 0),
        0
    );

    const first7DaysIncome =
        dailyEarnings?.data
            ?.slice(0, 7)
            .reduce(
                (sum: number, item: { earnings: number }) =>
                    sum + (item.earnings || 0),
                0
            ) ?? 0;

    const first30DaysIncome =
        dailyEarnings?.data
            ?.slice(0, 30)
            .reduce(
                (sum: number, item: { earnings: number }) =>
                    sum + (item.earnings || 0),
                0
            ) ?? 0;

    const weeklyIncome =
        dailyEarnings?.data?.length >= 7 ? first7DaysIncome : total;

    const monthlyIncome =
        dailyEarnings?.data?.length >= 30 ? first30DaysIncome : total;

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
        { completedRides: 0, cancelledRides: 0, pickedRides: 0 }
    );

    //  Pie chart data
    const ridesData = [
        { name: 'Completed', value: analytics?.completedRides || 0 },
        { name: 'Cancelled', value: analytics?.cancelledRides || 0 },
        { name: 'Picked', value: analytics?.pickedRides || 0 },
    ];

    const COLORS = ['#22c55e', '#ef4444', '#3b82f6'];

    //  Bar chart data
    const rideStats = [
        { type: 'Completed', count: analytics?.completedRides || 0 },
        { type: 'Cancelled', count: analytics?.cancelledRides || 0 },
        { type: 'Picked', count: analytics?.pickedRides || 0 },
    ];

    // ✅ Loading state
    if (dailyLoading || pickLoading) {
        return <div className='p-6'>Loading analytics...</div>;
    }

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
                        ৳ {dailyIncome}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Income</CardTitle>
                    </CardHeader>
                    <CardContent className='text-2xl font-bold text-blue-600'>
                        ৳ {weeklyIncome}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Income</CardTitle>
                    </CardHeader>
                    <CardContent className='text-2xl font-bold text-purple-600'>
                        ৳ {monthlyIncome}
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
