import { FaCar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { useGetAllRideQuery } from '../../Redux/Features/Ride/ride.api';
import NavigateHome from '../../Utils/NavigateHome';

function RideAnalytics() {
    const { data, isLoading } = useGetAllRideQuery(undefined);
    const rides = data?.data?.result || [];

    if (isLoading) {
        return (
            <div className='p-6 text-center text-gray-500'>
                Loading rider analytics...
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

    // Calculate ride stats
    const completedRides = rides.filter(
        (r: { status: string }) => r.status === 'COMPLETED'
    ).length;
    const cancelledRides = rides.filter(
        (r: { status: string }) => r.status === 'CANCELLED'
    ).length;
    const totalRides = rides.length;

    const totalPayment = rides.reduce(
        (sum: number, ride: { status: string; payment: number }) =>
            ride.status !== 'CANCELLED' ? sum + (ride.payment || 0) : sum,
        0
    );

    // Pie chart data
    const pieData = [
        { name: 'Completed', value: completedRides, color: '#10B981' },
        { name: 'Cancelled', value: cancelledRides, color: '#EF4444' },
    ];

    return (
        <div className='p-6'>
            <div className=''>
                <NavigateHome />
            </div>
            {/* Header */}
            <div className='mb-8 mt-10 text-center'>
                <h1 className='text-3xl font-bold'>🚖 Rider Analytics</h1>
                <p className='text-gray-400 mt-2'>
                    Quick summary of your ride performance
                </p>
            </div>

            {/* Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
                {/* Total Rides */}
                <div
                    className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    rounded-xl shadow p-6 hover:shadow-md dark:hover:shadow-lg
                    transition text-center'
                >
                    <div
                        className='flex items-center justify-center w-14 h-14 mx-auto
                        rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                    >
                        <FaCar className='text-2xl' />
                    </div>
                    <h2 className='mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200'>
                        Total Rides
                    </h2>
                    <p className='mt-1 text-3xl font-bold text-gray-900 dark:text-white'>
                        {totalRides}
                    </p>
                </div>

                {/* Completed Rides */}
                <div
                    className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    rounded-xl shadow p-6 hover:shadow-md dark:hover:shadow-lg
                    transition text-center'
                >
                    <div
                        className='flex items-center justify-center w-14 h-14 mx-auto
                        rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                    >
                        <FaCheckCircle className='text-2xl' />
                    </div>
                    <h2 className='mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200'>
                        Completed Rides
                    </h2>
                    <p className='mt-1 text-3xl font-bold text-gray-900 dark:text-white'>
                        {completedRides}
                    </p>
                </div>

                {/* Cancelled Rides */}
                <div
                    className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    rounded-xl shadow p-6 hover:shadow-md dark:hover:shadow-lg
                    transition text-center'
                >
                    <div
                        className='flex items-center justify-center w-14 h-14 mx-auto
                        rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                    >
                        <FaTimesCircle className='text-2xl' />
                    </div>
                    <h2 className='mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200'>
                        Cancelled Rides
                    </h2>
                    <p className='mt-1 text-3xl font-bold text-gray-900 dark:text-white'>
                        {cancelledRides}
                    </p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className='flex justify-center'>
                <PieChart width={450} height={400}>
                    <Pie
                        data={pieData}
                        dataKey='value'
                        cx='50%'
                        cy='50%'
                        outerRadius={120}
                        label={(entry) => entry.name + ` (${entry.value})`}
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign='bottom' height={36} />
                </PieChart>
            </div>

            {/* Total Payment */}
            <div
                className='mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    rounded-xl shadow p-6 hover:shadow-md dark:hover:shadow-lg
                    transition text-center'
            >
                <h2 className='text-lg font-semibold'>
                    Total Payment Collected
                </h2>
                <p className='mt-1 text-3xl font-bold'>
                    ${totalPayment.toFixed(2)}
                </p>
            </div>
        </div>
    );
}

export default RideAnalytics;
