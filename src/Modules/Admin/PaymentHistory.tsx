import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    DollarSign,
    TrendingUp,
    XCircle,
} from 'lucide-react';
import { useMemo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// ✅ Admin Payment History - সকলের payment history দেখতে পারবে
// ✅ Total earnings, payment count, analytics সব দেখাবে

interface PaymentRecord {
    _id: string;
    rideId: string;
    userId: string;
    userName: string;
    amount: number;
    status: 'PAID' | 'UNPAID' | 'FAILED' | 'REFUNDED';
    createdAt: string;
    pickup: string;
    drop: string;
}

interface AdminPaymentHistoryProps {
    // ✅ Backend থেকে সকলের payment data আসবে
    payments?: PaymentRecord[];
    isLoading?: boolean;
}

const AdminPaymentHistory = ({
    payments = [],
    isLoading = false,
}: AdminPaymentHistoryProps) => {
    // ✅ Analytics calculation
    const analytics = useMemo(() => {
        if (payments.length === 0) {
            return {
                totalPayments: 0,
                totalEarnings: 0,
                paidCount: 0,
                failedCount: 0,
                refundedCount: 0,
                avgPayment: 0,
            };
        }

        const paidPayments = payments.filter((p) => p.status === 'PAID');
        const failedPayments = payments.filter((p) => p.status === 'FAILED');
        const refundedPayments = payments.filter(
            (p) => p.status === 'REFUNDED'
        );
        const totalEarnings = paidPayments.reduce(
            (sum, p) => sum + p.amount,
            0
        );

        return {
            totalPayments: payments.length,
            totalEarnings,
            paidCount: paidPayments.length,
            failedCount: failedPayments.length,
            refundedCount: refundedPayments.length,
            avgPayment: totalEarnings / Math.max(paidPayments.length, 1),
        };
    }, [payments]);

    // ✅ Daily earnings chart data
    const chartData = useMemo(() => {
        const grouped: { [key: string]: number } = {};

        payments
            .filter((p) => p.status === 'PAID')
            .forEach((p) => {
                const date = new Date(p.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                });
                grouped[date] = (grouped[date] || 0) + p.amount;
            });

        return Object.entries(grouped)
            .map(([date, earnings]) => ({
                date,
                earnings,
            }))
            .slice(-7); // Last 7 days
    }, [payments]);

    // ✅ Status badge styling
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'PAID':
                return {
                    bg: 'dark:bg-green-900 bg-green-50',
                    text: 'dark:text-green-200 text-green-700',
                    icon: <CheckCircle className='w-4 h-4' />,
                };
            case 'FAILED':
                return {
                    bg: 'dark:bg-red-900 bg-red-50',
                    text: 'dark:text-red-200 text-red-700',
                    icon: <XCircle className='w-4 h-4' />,
                };
            case 'REFUNDED':
                return {
                    bg: 'dark:bg-blue-900 bg-blue-50',
                    text: 'dark:text-blue-200 text-blue-700',
                    icon: <AlertCircle className='w-4 h-4' />,
                };
            default:
                return {
                    bg: 'dark:bg-gray-700 bg-gray-50',
                    text: 'dark:text-gray-200 text-gray-700',
                    icon: <Clock className='w-4 h-4' />,
                };
        }
    };

    if (isLoading) {
        return (
            <div className='space-y-4'>
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className='h-20 dark:bg-gray-800 bg-gray-200 rounded-lg animate-pulse'
                    />
                ))}
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            {/* ✅ Stats Grid - 5 কার্ড */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
                {/* Total Payments */}
                <Card className='dark:bg-gray-800 dark:border-gray-700'>
                    <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xs dark:text-gray-400 text-gray-600 uppercase'>
                                    Total Payments
                                </p>
                                <p className='text-2xl font-bold dark:text-white text-gray-900 mt-1'>
                                    {analytics.totalPayments}
                                </p>
                            </div>
                            <div className='p-3 dark:bg-blue-900 bg-blue-100 rounded-lg'>
                                <DollarSign className='w-6 h-6 dark:text-blue-300 text-blue-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Earnings */}
                <Card className='dark:bg-gray-800 dark:border-gray-700'>
                    <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xs dark:text-gray-400 text-gray-600 uppercase'>
                                    Total Earnings
                                </p>
                                <p className='text-2xl font-bold dark:text-green-400 text-green-600 mt-1'>
                                    {analytics.totalEarnings.toLocaleString()}{' '}
                                    TK
                                </p>
                            </div>
                            <div className='p-3 dark:bg-green-900 bg-green-100 rounded-lg'>
                                <TrendingUp className='w-6 h-6 dark:text-green-300 text-green-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Paid Payments */}
                <Card className='dark:bg-gray-800 dark:border-gray-700'>
                    <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xs dark:text-gray-400 text-gray-600 uppercase'>
                                    Paid
                                </p>
                                <p className='text-2xl font-bold dark:text-green-400 text-green-600 mt-1'>
                                    {analytics.paidCount}
                                </p>
                            </div>
                            <div className='p-3 dark:bg-green-900 bg-green-100 rounded-lg'>
                                <CheckCircle className='w-6 h-6 dark:text-green-300 text-green-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Failed Payments */}
                <Card className='dark:bg-gray-800 dark:border-gray-700'>
                    <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xs dark:text-gray-400 text-gray-600 uppercase'>
                                    Failed
                                </p>
                                <p className='text-2xl font-bold dark:text-red-400 text-red-600 mt-1'>
                                    {analytics.failedCount}
                                </p>
                            </div>
                            <div className='p-3 dark:bg-red-900 bg-red-100 rounded-lg'>
                                <XCircle className='w-6 h-6 dark:text-red-300 text-red-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Avg Payment */}
                <Card className='dark:bg-gray-800 dark:border-gray-700'>
                    <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xs dark:text-gray-400 text-gray-600 uppercase'>
                                    Avg Payment
                                </p>
                                <p className='text-2xl font-bold dark:text-purple-400 text-purple-600 mt-1'>
                                    {analytics.avgPayment.toFixed(0)} TK
                                </p>
                            </div>
                            <div className='p-3 dark:bg-purple-900 bg-purple-100 rounded-lg'>
                                <DollarSign className='w-6 h-6 dark:text-purple-300 text-purple-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ✅ Chart - Daily Earnings */}
            {chartData.length > 0 && (
                <Card className='dark:bg-gray-800 dark:border-gray-700'>
                    <CardHeader>
                        <CardTitle className='dark:text-white text-gray-900'>
                            Daily Earnings (Last 7 Days)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width='100%' height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray='3 3'
                                    stroke='currentColor'
                                    className='dark:stroke-gray-700'
                                />
                                <XAxis
                                    dataKey='date'
                                    stroke='currentColor'
                                    className='dark:stroke-gray-600'
                                />
                                <YAxis
                                    stroke='currentColor'
                                    className='dark:stroke-gray-600'
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--color-bg)',
                                        border: '1px solid var(--color-border)',
                                    }}
                                />
                                <Bar
                                    dataKey='earnings'
                                    fill='#10b981'
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}

            {/* ✅ Payments Table */}
            <Card className='dark:bg-gray-800 dark:border-gray-700'>
                <CardHeader>
                    <CardTitle className='dark:text-white text-gray-900'>
                        Recent Payments
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {payments.length === 0 ? (
                        <p className='text-center dark:text-gray-400 text-gray-600 py-8'>
                            No payments yet
                        </p>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='w-full text-sm'>
                                <thead>
                                    <tr className='border-b dark:border-gray-700'>
                                        <th className='text-left py-3 px-4 dark:text-gray-300 text-gray-700 font-medium'>
                                            User
                                        </th>
                                        <th className='text-left py-3 px-4 dark:text-gray-300 text-gray-700 font-medium'>
                                            Route
                                        </th>
                                        <th className='text-left py-3 px-4 dark:text-gray-300 text-gray-700 font-medium'>
                                            Amount
                                        </th>
                                        <th className='text-left py-3 px-4 dark:text-gray-300 text-gray-700 font-medium'>
                                            Status
                                        </th>
                                        <th className='text-left py-3 px-4 dark:text-gray-300 text-gray-700 font-medium'>
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment) => {
                                        const statusStyle = getStatusStyles(
                                            payment.status
                                        );
                                        return (
                                            <tr
                                                key={payment._id}
                                                className='border-b dark:border-gray-700 hover:dark:bg-gray-700 hover:bg-gray-50 transition'
                                            >
                                                <td className='py-3 px-4 dark:text-gray-200 text-gray-800'>
                                                    <p className='font-medium'>
                                                        {payment.userName}
                                                    </p>
                                                </td>
                                                <td className='py-3 px-4 dark:text-gray-300 text-gray-700'>
                                                    <p className='text-xs truncate max-w-xs'>
                                                        {payment.pickup} →{' '}
                                                        {payment.drop}
                                                    </p>
                                                </td>
                                                <td className='py-3 px-4 dark:text-gray-200 text-gray-800 font-semibold'>
                                                    {payment.amount} TK
                                                </td>
                                                <td className='py-3 px-4'>
                                                    <div
                                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                                                    >
                                                        {statusStyle.icon}
                                                        {payment.status}
                                                    </div>
                                                </td>
                                                <td className='py-3 px-4 dark:text-gray-400 text-gray-600 text-xs'>
                                                    {new Date(
                                                        payment.createdAt
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminPaymentHistory;
