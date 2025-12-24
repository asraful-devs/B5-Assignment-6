/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetRideQuery } from '@/Redux/Features/Ride/ride.api';
import Loading from '@/components/Loading';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    DollarSign,
    MapPin,
    XCircle,
} from 'lucide-react';

const PaymentHistory = () => {
    const { data, isLoading, error } = useGetRideQuery(undefined);

    const rides = data?.data?.rides?.result || [];

    const historyRides = rides.filter(
        (ride: any) =>
            ride.status === 'COMPLETED' || ride.status === 'CANCELLED'
    );

    const sortedRides = [...historyRides].sort(
        (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Card className='border-red-200 bg-red-50'>
                <CardContent className='pt-6'>
                    <div className='flex items-center gap-2 text-red-700'>
                        <AlertCircle className='w-5 h-5' />
                        <p>Failed to load payment history</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (sortedRides.length === 0) {
        return (
            <Card className='border-gray-200 bg-gray-50'>
                <CardContent className='pt-6'>
                    <div className='flex items-center gap-2 text-gray-600'>
                        <AlertCircle className='w-5 h-5' />
                        <p>No payment history yet</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getPaymentStatusDetails = (rideStatus: string) => {
        if (rideStatus === 'COMPLETED') {
            return {
                icon: <CheckCircle className='w-5 h-5 text-green-500' />,
                label: 'Paid',
                bgColor: 'bg-green-50',
                textColor: 'text-green-700',
            };
        }
        return {
            icon: <XCircle className='w-5 h-5 text-red-500' />,
            label: 'Cancelled',
            bgColor: 'bg-red-50',
            textColor: 'text-red-700',
        };
    };

    return (
        <div className='space-y-4'>
            <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
                    <Calendar className='w-5 h-5 text-green-500' />
                    Payment History ({sortedRides.length})
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                    View your completed and cancelled rides
                </p>
            </div>

            <div className='space-y-3'>
                {sortedRides.map((ride: any) => {
                    const statusDetails = getPaymentStatusDetails(ride.status);

                    return (
                        <Card
                            key={ride._id}
                            className={`border-gray-200 ${statusDetails.bgColor} transition-all hover:shadow-md`}
                        >
                            <CardContent className='pt-4'>
                                <div className='flex items-start justify-between gap-3 mb-3'>
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-center gap-1 text-sm text-gray-700 mb-1'>
                                            <MapPin className='w-4 h-4 flex-shrink-0' />
                                            <span className='truncate'>
                                                {ride.pickupLocation} →{' '}
                                                {ride.dropLocation}
                                            </span>
                                        </div>
                                        {/* Date/Time */}
                                        <p className='text-xs text-gray-600'>
                                            {formatDistanceToNow(
                                                new Date(ride.createdAt),
                                                {
                                                    addSuffix: true,
                                                }
                                            )}
                                        </p>
                                    </div>

                                    {/* Status badge */}
                                    <div
                                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${statusDetails.textColor}`}
                                    >
                                        {statusDetails.icon}
                                        <span>{statusDetails.label}</span>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between pt-2 border-t border-gray-200'>
                                    <div className='flex items-center gap-1 text-gray-700'>
                                        <DollarSign className='w-4 h-4 text-green-500' />
                                        <span className='text-sm'>
                                            Amount Paid
                                        </span>
                                    </div>
                                    <span className='font-bold text-gray-900 text-lg'>
                                        {ride.payment} TK
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default PaymentHistory;
