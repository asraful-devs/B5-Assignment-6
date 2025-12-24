/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInitPaymentMutation } from '@/Redux/Features/Payment/payment.api';
import { useGetRideQuery } from '@/Redux/Features/Ride/ride.api';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    DollarSign,
    MapPin,
    Wallet,
    XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

const RiderPaymentView = () => {
    const { data, isLoading, error } = useGetRideQuery(undefined);
    const [initPayment, { isLoading: paymentLoading }] =
        useInitPaymentMutation();
    // const [getPaymentDetailsByRideId] = useGetPaymentByRideQuery();

    const [expandedRideId, setExpandedRideId] = useState<string | null>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const rides = data?.data?.rides?.result || [];

    const groupedRides = useMemo(() => {
        return {
            pending: rides.filter((r: any) => r.status === 'PENDING'),
            picked: rides.filter((r: any) => r.status === 'PICKED'),
            completed: rides.filter((r: any) => r.status === 'COMPLETED'),
        };
    }, [rides]);

    // ✅ Total spent calculation
    const totalSpent = useMemo(() => {
        return rides
            .filter((r: any) => r.status === 'COMPLETED')
            .reduce((sum: number, r: any) => sum + r.payment, 0);
    }, [rides]);

    // Payment button click handler
    const handlePayment = async (rideId: string, paymentUrl?: string) => {
        try {
            if (paymentUrl) {
                console.log('✅ Using pre-generated payment URL:', paymentUrl);
                window.location.href = `/payment?url=${encodeURIComponent(
                    paymentUrl
                )}`;
                return;
            }

            const result = await initPayment(rideId).unwrap();
            if (result?.data?.paymentUrl) {
                window.location.href = `/payment?url=${encodeURIComponent(
                    result.data.paymentUrl
                )}`;
            }
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to initiate payment');
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'PENDING':
                return {
                    bg: 'dark:bg-yellow-900 bg-yellow-50',
                    text: 'dark:text-yellow-200 text-yellow-700',
                    icon: <Clock className='w-4 h-4' />,
                    label: 'Waiting for driver',
                };
            case 'PICKED':
                return {
                    bg: 'dark:bg-blue-900 bg-blue-50',
                    text: 'dark:text-blue-200 text-blue-700',
                    icon: <Wallet className='w-4 h-4' />,
                    label: 'Payment ready',
                };
            case 'COMPLETED':
                return {
                    bg: 'dark:bg-green-900 bg-green-50',
                    text: 'dark:text-green-200 text-green-700',
                    icon: <CheckCircle className='w-4 h-4' />,
                    label: 'Completed',
                };
            default:
                return {
                    bg: 'dark:bg-gray-700 bg-gray-50',
                    text: 'dark:text-gray-200 text-gray-700',
                    icon: <AlertCircle className='w-4 h-4' />,
                    label: 'Unknown',
                };
        }
    };

    const getPaymentStatusStyles = (status: string) => {
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
            default:
                return {
                    bg: 'dark:bg-yellow-900 bg-yellow-50',
                    text: 'dark:text-yellow-200 text-yellow-700',
                    icon: <Clock className='w-4 h-4' />,
                };
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Card className='dark:bg-gray-800 dark:border-gray-700 border-red-200 bg-red-50'>
                <CardContent className='pt-6'>
                    <div className='flex items-center gap-2 dark:text-red-200 text-red-700'>
                        <AlertCircle className='w-5 h-5' />
                        <p>Failed to load rides</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className='space-y-6'>
            {/* ✅ Summary Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Active Rides */}
                <Card className='dark:bg-gray-800 dark:border-gray-700'>
                    <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xs dark:text-gray-400 text-gray-600 uppercase'>
                                    Active Rides
                                </p>
                                <p className='text-2xl font-bold dark:text-white text-gray-900 mt-1'>
                                    {groupedRides.pending.length +
                                        groupedRides.picked.length}
                                </p>
                            </div>
                            <div className='p-3 dark:bg-blue-900 bg-blue-100 rounded-lg'>
                                <Clock className='w-6 h-6 dark:text-blue-300 text-blue-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ready to Pay */}
                <Card className='dark:bg-gray-800 dark:border-gray-700'>
                    <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xs dark:text-gray-400 text-gray-600 uppercase'>
                                    Ready to Pay
                                </p>
                                <p className='text-2xl font-bold dark:text-yellow-400 text-yellow-600 mt-1'>
                                    {groupedRides.picked.length}
                                </p>
                            </div>
                            <div className='p-3 dark:bg-yellow-900 bg-yellow-100 rounded-lg'>
                                <Wallet className='w-6 h-6 dark:text-yellow-300 text-yellow-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Spent */}
                <Card className='dark:bg-gray-800 dark:border-gray-700'>
                    <CardContent className='pt-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xs dark:text-gray-400 text-gray-600 uppercase'>
                                    Total Spent
                                </p>
                                <p className='text-2xl font-bold dark:text-green-400 text-green-600 mt-1'>
                                    {totalSpent} TK
                                </p>
                            </div>
                            <div className='p-3 dark:bg-green-900 bg-green-100 rounded-lg'>
                                <DollarSign className='w-6 h-6 dark:text-green-300 text-green-600' />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ✅ Pending Rides Section */}
            {groupedRides.pending.length > 0 && (
                <div className='space-y-3'>
                    <h3 className='text-lg font-semibold dark:text-white text-gray-900 flex items-center gap-2'>
                        <Clock className='w-5 h-5 dark:text-yellow-400 text-yellow-600' />
                        Waiting for Driver ({groupedRides.pending.length})
                    </h3>

                    {groupedRides.pending.map((ride: any) => {
                        const statusStyle = getStatusStyles('PENDING');
                        return (
                            <Card
                                key={ride._id}
                                className='dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:dark:bg-gray-750 hover:bg-gray-50 transition'
                                onClick={() =>
                                    setExpandedRideId(
                                        expandedRideId === ride._id
                                            ? null
                                            : ride._id
                                    )
                                }
                            >
                                <CardContent className='pt-4'>
                                    <div className='flex items-start justify-between gap-3'>
                                        <div className='flex-1'>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <MapPin className='w-4 h-4 dark:text-blue-400 text-blue-500' />
                                                <span className='text-sm dark:text-gray-300 text-gray-700 font-medium truncate'>
                                                    {ride.pickupLocation}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <MapPin className='w-4 h-4 dark:text-red-400 text-red-500' />
                                                <span className='text-sm dark:text-gray-300 text-gray-700 font-medium truncate'>
                                                    {ride.dropLocation}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap ${statusStyle.bg} ${statusStyle.text}`}
                                        >
                                            {statusStyle.icon}
                                            {statusStyle.label}
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between pt-3 border-t dark:border-gray-700 mt-3'>
                                        <div className='flex items-center gap-2'>
                                            <DollarSign className='w-4 h-4 dark:text-green-400 text-green-600' />
                                            <span className='font-bold dark:text-white text-gray-900'>
                                                {ride.payment} TK
                                            </span>
                                        </div>
                                        <span className='text-xs dark:text-gray-400 text-gray-600'>
                                            {new Date(
                                                ride.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* ✅ Ready to Pay Rides Section */}
            {groupedRides.picked.length > 0 && (
                <div className='space-y-3'>
                    <h3 className='text-lg font-semibold dark:text-white text-gray-900 flex items-center gap-2'>
                        <Wallet className='w-5 h-5 dark:text-blue-400 text-blue-600' />
                        Ready to Pay ({groupedRides.picked.length})
                    </h3>

                    {groupedRides.picked.map((ride: any) => {
                        const paymentStatusStyle = getPaymentStatusStyles(
                            ride.paymentStatus || 'UNPAID'
                        );

                        return (
                            <Card
                                key={ride._id}
                                className='dark:bg-gray-800 dark:border-gray-700 border-2 border-blue-200'
                            >
                                <CardContent className='pt-4'>
                                    <div className='flex items-start justify-between gap-3 mb-3'>
                                        <div className='flex-1'>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <MapPin className='w-4 h-4 dark:text-blue-400 text-blue-500' />
                                                <span className='text-sm dark:text-gray-300 text-gray-700 font-medium truncate'>
                                                    {ride.pickupLocation}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <MapPin className='w-4 h-4 dark:text-red-400 text-red-500' />
                                                <span className='text-sm dark:text-gray-300 text-gray-700 font-medium truncate'>
                                                    {ride.dropLocation}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap ${paymentStatusStyle.bg} ${paymentStatusStyle.text}`}
                                        >
                                            {paymentStatusStyle.icon}
                                            {ride.paymentStatus || 'UNPAID'}
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between pt-3 border-t dark:border-gray-700 mb-3'>
                                        <div className='flex items-center gap-2'>
                                            <DollarSign className='w-4 h-4 dark:text-green-400 text-green-600' />
                                            <span className='font-bold dark:text-white text-gray-900 text-lg'>
                                                {ride.payment} TK
                                            </span>
                                        </div>
                                    </div>

                                    {ride.paymentStatus !== 'PAID' && (
                                        <Button
                                            onClick={() =>
                                                handlePayment(
                                                    ride._id,
                                                    ride.paymentUrl
                                                )
                                            }
                                            disabled={paymentLoading}
                                            className='w-full dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition'
                                        >
                                            {paymentLoading ? (
                                                <span className='flex items-center gap-2'>
                                                    <span className='w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin' />
                                                    Processing...
                                                </span>
                                            ) : (
                                                'Pay Now'
                                            )}
                                        </Button>
                                    )}

                                    {ride.paymentStatus === 'PAID' && (
                                        <div className='w-full py-2 rounded-lg dark:bg-green-900 bg-green-50 text-center'>
                                            <p className='text-sm font-medium dark:text-green-200 text-green-700'>
                                                ✓ Payment Complete
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* ✅ Completed Rides Section */}
            {groupedRides.completed.length > 0 && (
                <div className='space-y-3'>
                    <h3 className='text-lg font-semibold dark:text-white text-gray-900 flex items-center gap-2'>
                        <CheckCircle className='w-5 h-5 dark:text-green-400 text-green-600' />
                        Completed ({groupedRides.completed.length})
                    </h3>

                    {groupedRides.completed.map((ride: any) => (
                        <Card
                            key={ride._id}
                            className='dark:bg-gray-800 dark:border-gray-700'
                        >
                            <CardContent className='pt-4'>
                                <div className='flex items-start justify-between gap-3'>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-2 mb-2'>
                                            <MapPin className='w-4 h-4 dark:text-blue-400 text-blue-500' />
                                            <span className='text-sm dark:text-gray-300 text-gray-700 font-medium truncate'>
                                                {ride.pickupLocation}
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <MapPin className='w-4 h-4 dark:text-red-400 text-red-500' />
                                            <span className='text-sm dark:text-gray-300 text-gray-700 font-medium truncate'>
                                                {ride.dropLocation}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between pt-3 border-t dark:border-gray-700 mt-3'>
                                    <div className='flex items-center gap-2'>
                                        <DollarSign className='w-4 h-4 dark:text-green-400 text-green-600' />
                                        <span className='font-bold dark:text-white text-gray-900'>
                                            {ride.payment} TK
                                        </span>
                                    </div>
                                    <span className='text-xs dark:text-gray-400 text-gray-600'>
                                        {new Date(
                                            ride.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* ✅ Empty State */}
            {rides.length === 0 && (
                <Card className='dark:bg-gray-800 dark:border-gray-700 border-blue-200 bg-blue-50'>
                    <CardContent className='pt-6'>
                        <div className='flex items-center gap-2 dark:text-blue-200 text-blue-700'>
                            <AlertCircle className='w-5 h-5' />
                            <p>No rides yet. Create one to get started!</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default RiderPaymentView;
