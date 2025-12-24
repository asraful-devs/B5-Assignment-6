/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetRideQuery } from '@/Redux/Features/Ride/ride.api';
import Loading from '@/components/Loading';
import { Card, CardContent } from '@/components/ui/card';
import {
    AlertCircle,
    ChevronRight,
    Clock,
    DollarSign,
    MapPin,
} from 'lucide-react';
import { useState } from 'react';
import PaymentCard from './PaymentCard';

const RidesWithPayment = () => {
    const { data, isLoading, error } = useGetRideQuery(undefined);

    const [expandedRideId, setExpandedRideId] = useState<string | null>(null);

    const rides = data?.data?.rides?.result || [];
    const activeRides = rides.filter(
        (ride: any) => ride.status !== 'COMPLETED'
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'PICKED':
                return 'bg-blue-100 text-blue-800';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <Clock className='w-4 h-4' />;
            case 'PICKED':
                return <ChevronRight className='w-4 h-4' />;
            default:
                return null;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Card className='border-red-200 bg-red-50'>
                <CardContent className='pt-6'>
                    <div className='flex items-center gap-2 text-red-700'>
                        <AlertCircle className='w-5 h-5' />
                        <p>Failed to load rides</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (activeRides.length === 0) {
        return (
            <Card className='border-blue-200 bg-blue-50'>
                <CardContent className='pt-6'>
                    <div className='flex items-center gap-2 text-blue-700'>
                        <AlertCircle className='w-5 h-5' />
                        <p>No active rides at the moment</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className='space-y-4'>
            <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-800'>
                    My Active Rides ({activeRides.length})
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                    Click on a ride to view and manage payments
                </p>
            </div>

            <div className='space-y-3'>
                {activeRides.map((ride: any) => (
                    <div key={ride._id} className='space-y-2'>
                        <Card
                            className='border-gray-200 cursor-pointer transition-all hover:shadow-md hover:border-blue-300'
                            onClick={() =>
                                setExpandedRideId(
                                    expandedRideId === ride._id
                                        ? null
                                        : ride._id
                                )
                            }
                        >
                            <CardContent className='pt-4'>
                                <div className='flex items-start justify-between gap-3 mb-3'>
                                    {/* Route */}
                                    <div className='flex-1 min-w-0'>
                                        {/* Pickup */}
                                        <div className='flex items-center gap-2 mb-2'>
                                            <MapPin className='w-4 h-4 text-blue-500 flex-shrink-0' />
                                            <span className='text-sm font-medium text-gray-800 truncate'>
                                                {ride.pickupLocation}
                                            </span>
                                        </div>
                                        {/* Drop */}
                                        <div className='flex items-center gap-2'>
                                            <MapPin className='w-4 h-4 text-red-500 flex-shrink-0' />
                                            <span className='text-sm font-medium text-gray-800 truncate'>
                                                {ride.dropLocation}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status badge */}
                                    <div
                                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap ${getStatusColor(
                                            ride.status
                                        )}`}
                                    >
                                        {getStatusIcon(ride.status)}
                                        <span>{ride.status}</span>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between pt-2 border-t border-gray-200'>
                                    <div className='flex items-center gap-2'>
                                        <DollarSign className='w-4 h-4 text-green-500' />
                                        <span className='font-bold text-gray-900'>
                                            {ride.payment} TK
                                        </span>
                                    </div>

                                    {/* Expand icon */}
                                    <ChevronRight
                                        className={`w-5 h-5 text-gray-400 transition-transform ${
                                            expandedRideId === ride._id
                                                ? 'rotate-90'
                                                : ''
                                        }`}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {expandedRideId === ride._id && (
                            <div className='pl-4 border-l-2 border-blue-300'>
                                <PaymentCard
                                    rideId={ride._id}
                                    pickupLocation={ride.pickupLocation}
                                    dropLocation={ride.dropLocation}
                                    amount={ride.payment}
                                    paymentStatus={
                                        ride.paymentStatus || 'UNPAID'
                                    }
                                    rideStatus={ride.status}
                                    paymentUrl={ride.paymentUrl}
                                    onPaymentSuccess={() => {
                                        window.location.reload();
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RidesWithPayment;
