/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetRideQuery } from '@/Redux/Features/Ride/ride.api';
import Loading from '@/components/Loading';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Clock } from 'lucide-react';
import PaymentCard from './PaymentCard';

const PaymentPending = () => {
    const { data, isLoading, error } = useGetRideQuery(undefined);

    const rides = data?.data?.rides?.result || [];

    const pendingPaymentRides = rides.filter(
        (ride: any) => ride.status === 'PICKED'
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
                        <p>Failed to load pending payments</p>
                    </div>
                </CardContent>
            </Card>
        );
    }
    if (pendingPaymentRides.length === 0) {
        return (
            <Card className='border-blue-200 bg-blue-50'>
                <CardContent className='pt-6'>
                    <div className='flex items-center gap-2 text-blue-700'>
                        <Clock className='w-5 h-5' />
                        <p>No pending payments at the moment</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className='space-y-4'>
            <div className='mb-4'>
                <h3 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
                    <Clock className='w-5 h-5 text-yellow-500' />
                    Pending Payments ({pendingPaymentRides.length})
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                    Complete payment for rides that have been picked up
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {pendingPaymentRides.map((ride: any) => (
                    <PaymentCard
                        key={ride._id}
                        rideId={ride._id}
                        pickupLocation={ride.pickupLocation}
                        dropLocation={ride.dropLocation}
                        amount={ride.payment}
                        paymentStatus={ride.paymentStatus || 'UNPAID'}
                        rideStatus={ride.status}
                        paymentUrl={ride.paymentUrl}
                        onPaymentSuccess={() => {
                            window.location.reload();
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PaymentPending;
