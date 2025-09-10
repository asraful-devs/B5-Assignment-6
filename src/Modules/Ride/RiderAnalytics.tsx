import {
    Bar,
    BarChart,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useGetRideQuery } from '../../Redux/Features/Ride/ride.api';
import NavigateHome from '../../Utils/NavigateHome';

const RiderAnalytics = () => {
    const { data, isLoading } = useGetRideQuery(undefined);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-lg'>Loading analytics...</p>
            </div>
        );
    }

    // rides data
    const rides = data?.data?.rides?.result || [];

    // filter by status
    const pickedCount = rides.filter(
        (r: { status: string }) => r.status === 'PICKED'
    ).length;
    const completedCount = rides.filter(
        (r: { status: string }) => r.status === 'COMPLETED'
    ).length;
    const cancelledCount = rides.filter(
        (r: { status: string }) => r.status === 'CANCELLED'
    ).length;

    // total cost from only completed rides
    const totalCost = rides
        .filter((r: { status: string }) => r.status === 'COMPLETED')
        .reduce(
            (sum: number, r: { payment: number }) => sum + (r.payment || 0),
            0
        );

    const barData = [
        { name: 'Picked', value: pickedCount },
        { name: 'Completed', value: completedCount },
        { name: 'Cancelled', value: cancelledCount },
    ];

    const pieData = [
        { name: 'Picked', value: pickedCount },
        { name: 'Completed', value: completedCount },
        { name: 'Cancelled', value: cancelledCount },
    ];

    const COLORS = ['#3B82F6', '#10B981', '#EF4444'];

    return (
        <div className='p-6 min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500'>
            <div className='w-full max-w-6xl'>
                <NavigateHome />
            </div>

            <h2 className='text-3xl font-semibold my-10 text-center'>
                Rider Analytics
            </h2>

            {/* Charts Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl'>
                {/* Bar Chart */}
                <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6'>
                    <h3 className='text-lg font-semibold mb-4 text-center'>
                        Ride Status Overview
                    </h3>
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={barData}>
                            <XAxis dataKey='name' stroke='#9CA3AF' />
                            <YAxis stroke='#9CA3AF' />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    color: '#fff',
                                    borderRadius: '8px',
                                }}
                            />
                            <Legend />
                            <Bar dataKey='value' radius={[6, 6, 0, 0]}>
                                {barData.map((_entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6'>
                    <h3 className='text-lg font-semibold mb-4 text-center'>
                        Ride Distribution
                    </h3>
                    <ResponsiveContainer width='100%' height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx='50%'
                                cy='50%'
                                outerRadius={100}
                                dataKey='value'
                                label
                            >
                                {pieData.map((_entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    color: '#fff',
                                    borderRadius: '8px',
                                }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Total Cost Card */}
            <div className='mt-12 bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 p-8 rounded-2xl shadow-xl text-center w-full max-w-md'>
                <h3 className='text-xl font-semibold mb-2'>Total Cost</h3>
                <p className='text-4xl font-bold'>৳{totalCost}</p>
            </div>
        </div>
    );
};

export default RiderAnalytics;
