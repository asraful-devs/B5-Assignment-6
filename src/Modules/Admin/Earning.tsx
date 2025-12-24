/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllPaymentsQuery } from '@/Redux/Features/Payment/payment.api';

const Earning = () => {
    const { data, isLoading, error } = useGetAllPaymentsQuery(undefined);
    const payments = data?.data || [];

    if (isLoading) {
        return (
            <div className='p-6 text-center text-gray-500 dark:text-gray-400'>
                Loading payment analytics...
            </div>
        );
    }

    if (error) {
        return (
            <div className='p-6 text-center text-red-500 dark:text-red-400'>
                Error loading payments:{' '}
                {(error as any)?.data?.message || 'Unknown error'}
            </div>
        );
    }

    if (!payments || payments.length === 0) {
        return (
            <div className='p-6 text-center text-gray-500 dark:text-gray-400'>
                No payments found 🚫
            </div>
        );
    }

    // ✅ Stats Calculation from payments
    const paidPayments = payments.filter(
        (p: { status: string }) => p.status === 'PAID'
    );
    const failedPayments = payments.filter(
        (p: { status: string }) => p.status === 'FAILED'
    );
    const totalEarnings = paidPayments.reduce(
        (sum: number, p: { amount: number }) => sum + (p.amount || 0),
        0
    );
    const averageEarning =
        paidPayments.length > 0
            ? (totalEarnings / paidPayments.length).toFixed(2)
            : 0;

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
                    <h3 className='text-lg font-semibold'>Total Payments</h3>
                    <p className='text-2xl font-bold text-green-600 dark:text-green-400'>
                        {paidPayments.length}
                    </p>
                </div>
                <div className='bg-white dark:bg-gray-800 p-4 shadow rounded-lg text-center'>
                    <h3 className='text-lg font-semibold'>Failed Payments</h3>
                    <p className='text-2xl font-bold text-red-500 dark:text-red-400'>
                        {failedPayments.length}
                    </p>
                </div>
                <div className='bg-white dark:bg-gray-800 p-4 shadow rounded-lg text-center'>
                    <h3 className='text-lg font-semibold'>Total Earnings</h3>
                    <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                        {totalEarnings} TK
                    </p>
                </div>
                <div className='bg-white dark:bg-gray-800 p-4 shadow rounded-lg text-center'>
                    <h3 className='text-lg font-semibold'>Avg. Payment</h3>
                    <p className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                        {averageEarning} TK
                    </p>
                </div>
            </div>

            {/* Recent Payments Table */}
            <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-4'>
                <h3 className='text-lg font-semibold mb-4'>Recent Payments</h3>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='bg-gray-100 dark:bg-gray-700'>
                                <th className='p-3 border border-gray-200 dark:border-gray-700'>
                                    Date
                                </th>
                                <th className='p-3 border border-gray-200 dark:border-gray-700'>
                                    User
                                </th>
                                <th className='p-3 border border-gray-200 dark:border-gray-700'>
                                    Pickup → Drop
                                </th>
                                <th className='p-3 border border-gray-200 dark:border-gray-700'>
                                    Amount
                                </th>
                                <th className='p-3 border border-gray-200 dark:border-gray-700'>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments
                                .slice(0, 10)
                                .map(
                                    (payment: {
                                        _id: string;
                                        createdAt: string;
                                        userName: string;
                                        pickup: string;
                                        drop: string;
                                        amount: number;
                                        status: string;
                                    }) => (
                                        <tr
                                            key={payment._id}
                                            className='border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        >
                                            <td className='p-3'>
                                                {new Date(
                                                    payment.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className='p-3'>
                                                {payment.userName}
                                            </td>
                                            <td className='p-3 text-sm text-gray-600 dark:text-gray-400'>
                                                {payment.pickup} →{' '}
                                                {payment.drop}
                                            </td>
                                            <td className='p-3 font-semibold'>
                                                {payment.amount} TK
                                            </td>
                                            <td className='p-3'>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        payment.status ===
                                                        'PAID'
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                            : payment.status ===
                                                              'FAILED'
                                                            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                                    }`}
                                                >
                                                    {payment.status}
                                                </span>
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
