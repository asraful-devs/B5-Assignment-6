import type {
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactNode,
    ReactPortal,
} from 'react';
import { useGetAllRideQuery } from '../../Redux/Features/Ride/ride.api';

const Earning = () => {
    const { data, isLoading } = useGetAllRideQuery(undefined);
    const rides = data?.data?.result || [];

    if (isLoading) {
        return (
            <div className='p-6 text-center text-gray-500 dark:text-gray-400'>
                Loading Driver analytics...
            </div>
        );
    }

    if (!rides || rides.length === 0) {
        return (
            <div className='p-6 text-center text-gray-500 dark:text-gray-400'>
                No rides found 🚫
            </div>
        );
    }

    // Stats Calculation
    const completedRides = rides.filter(
        (r: { status: string }) => r.status === 'COMPLETED'
    ).length;
    const cancelledRides = rides.filter(
        (r: { status: string }) => r.status === 'CANCELLED'
    ).length;
    const totalPayment = rides.reduce(
        (sum: number, ride: { status: string; payment: number }) =>
            ride.status !== 'CANCELLED' ? sum + (ride.payment || 0) : sum,
        0
    );
    const averageEarning =
        completedRides > 0 ? (totalPayment / completedRides).toFixed(2) : 0;

    return (
        <div className='p-6 space-y-6 rounded-3xl bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-100 min-h-screen'>
            {/* Header */}
            <div>
                <h2 className='text-2xl font-bold'>Earnings Overview</h2>
                <p className='text-gray-600 dark:text-gray-300'>
                    View your earnings and payouts here.
                </p>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                <div className='bg-white dark:bg-gray-800 p-4 shadow rounded-lg text-center'>
                    <h3 className='text-lg font-semibold'>Completed</h3>
                    <p className='text-2xl font-bold text-green-600 dark:text-green-400'>
                        {completedRides}
                    </p>
                </div>
                <div className='bg-white dark:bg-gray-800 p-4 shadow rounded-lg text-center'>
                    <h3 className='text-lg font-semibold'>Cancelled</h3>
                    <p className='text-2xl font-bold text-red-500 dark:text-red-400'>
                        {cancelledRides}
                    </p>
                </div>
                <div className='bg-white dark:bg-gray-800 p-4 shadow rounded-lg text-center'>
                    <h3 className='text-lg font-semibold'>Total Earnings</h3>
                    <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                        ${totalPayment}
                    </p>
                </div>
                <div className='bg-white dark:bg-gray-800 p-4 shadow rounded-lg text-center'>
                    <h3 className='text-lg font-semibold'>Avg. Per Ride</h3>
                    <p className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                        ${averageEarning}
                    </p>
                </div>
            </div>

            {/* Recent Rides Table */}
            <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-4'>
                <h3 className='text-lg font-semibold mb-4'>Recent Rides</h3>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='bg-gray-100 dark:bg-gray-700'>
                                <th className='p-3 border border-gray-200 dark:border-gray-700'>
                                    Date
                                </th>
                                <th className='p-3 border border-gray-200 dark:border-gray-700'>
                                    From → To
                                </th>
                                <th className='p-3 border border-gray-200 dark:border-gray-700'>
                                    Status
                                </th>
                                <th className='p-3 border border-gray-200 dark:border-gray-700'>
                                    Payment
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rides.slice(0, 7).map(
                                (
                                    ride: {
                                        date: string | number | Date;
                                        pickupLocation:
                                            | string
                                            | number
                                            | bigint
                                            | boolean
                                            | ReactElement<
                                                  unknown,
                                                  | string
                                                  | JSXElementConstructor<unknown>
                                              >
                                            | Iterable<ReactNode>
                                            | ReactPortal
                                            | Promise<
                                                  | string
                                                  | number
                                                  | bigint
                                                  | boolean
                                                  | ReactPortal
                                                  | ReactElement<
                                                        unknown,
                                                        | string
                                                        | JSXElementConstructor<unknown>
                                                    >
                                                  | Iterable<ReactNode>
                                                  | null
                                                  | undefined
                                              >
                                            | null
                                            | undefined;
                                        dropLocation:
                                            | string
                                            | number
                                            | bigint
                                            | boolean
                                            | ReactElement<
                                                  unknown,
                                                  | string
                                                  | JSXElementConstructor<unknown>
                                              >
                                            | Iterable<ReactNode>
                                            | ReactPortal
                                            | Promise<
                                                  | string
                                                  | number
                                                  | bigint
                                                  | boolean
                                                  | ReactPortal
                                                  | ReactElement<
                                                        unknown,
                                                        | string
                                                        | JSXElementConstructor<unknown>
                                                    >
                                                  | Iterable<ReactNode>
                                                  | null
                                                  | undefined
                                              >
                                            | null
                                            | undefined;
                                        status:
                                            | string
                                            | number
                                            | bigint
                                            | boolean
                                            | ReactElement<
                                                  unknown,
                                                  | string
                                                  | JSXElementConstructor<unknown>
                                              >
                                            | Iterable<ReactNode>
                                            | Promise<
                                                  | string
                                                  | number
                                                  | bigint
                                                  | boolean
                                                  | ReactPortal
                                                  | ReactElement<
                                                        unknown,
                                                        | string
                                                        | JSXElementConstructor<unknown>
                                                    >
                                                  | Iterable<ReactNode>
                                                  | null
                                                  | undefined
                                              >
                                            | null
                                            | undefined;
                                        payment: number;
                                    },
                                    i: Key | null | undefined
                                ) => (
                                    <tr
                                        key={i}
                                        className='hover:bg-gray-50 dark:hover:bg-gray-700 transition'
                                    >
                                        <td className='p-3 border border-gray-200 dark:border-gray-700'>
                                            {new Date(
                                                ride.date
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className='p-3 border border-gray-200 dark:border-gray-700'>
                                            {ride.pickupLocation} →{' '}
                                            {ride.dropLocation}
                                        </td>
                                        <td
                                            className={`p-3 border border-gray-200 dark:border-gray-700 font-semibold ${
                                                ride.status === 'COMPLETED'
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-500 dark:text-red-400'
                                            }`}
                                        >
                                            {ride.status}
                                        </td>
                                        <td className='p-3 border border-gray-200 dark:border-gray-700'>
                                            ${ride.payment || 0}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Earning;
