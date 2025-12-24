/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInitPaymentMutation } from '@/Redux/Features/Payment/payment.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    DollarSign,
    MapPin,
} from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface PaymentCardProps {
    rideId: string;
    pickupLocation: string;
    dropLocation: string;
    amount: number;
    paymentStatus: 'PAID' | 'UNPAID' | 'FAILED' | 'CANCELLED';
    rideStatus: 'PENDING' | 'PICKED' | 'COMPLETED' | 'CANCELLED';
    paymentUrl?: string;
    onPaymentSuccess?: () => void;
}

const PaymentCard = ({
    rideId,
    pickupLocation,
    dropLocation,
    amount,
    paymentStatus,
    rideStatus,
    paymentUrl,
    onPaymentSuccess,
}: PaymentCardProps) => {
    const [initPayment, { isLoading, isError, error, data }] =
        useInitPaymentMutation();

    useEffect(() => {
        if (data?.data?.paymentUrl) {
            console.log('✅ Payment URL received:', data.data.paymentUrl);
            // Redirect to payment page with URL
            window.location.href = `/payment?url=${encodeURIComponent(
                data.data.paymentUrl
            )}`;
            onPaymentSuccess?.();
        }
    }, [data, onPaymentSuccess]);

    useEffect(() => {
        if (isError && error) {
            const errorMessage =
                (error as any)?.data?.message || 'Failed to initiate payment';
            console.error('❌ Payment error details:', {
                message: errorMessage,
                status: (error as any)?.status,
                fullError: error,
            });
            toast.error(errorMessage);
        }
    }, [isError, error]);

    const handlePayment = async () => {
        try {
            if (paymentUrl) {
                console.log('✅ Using pre-generated payment URL:', paymentUrl);
                window.location.href = `/payment?url=${encodeURIComponent(
                    paymentUrl
                )}`;
                onPaymentSuccess?.();
                return;
            }

            console.log('🔍 Attempting payment for rideId:', rideId);
            console.log('📦 Ride Status:', rideStatus);
            console.log('💳 Payment Status:', paymentStatus);
            await initPayment(rideId).unwrap();
        } catch (err) {
            console.error('❌ Payment initiation error:', err);
            console.error('Full error object:', JSON.stringify(err, null, 2));
        }
    };

    const getStatusColor = () => {
        switch (paymentStatus) {
            case 'PAID':
                return 'bg-green-100 text-green-800';
            case 'UNPAID':
                return 'bg-yellow-100 text-yellow-800';
            case 'FAILED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = () => {
        switch (paymentStatus) {
            case 'PAID':
                return <CheckCircle className='w-5 h-5' />;
            case 'UNPAID':
                return <Clock className='w-5 h-5' />;
            case 'FAILED':
                return <AlertCircle className='w-5 h-5' />;
            default:
                return null;
        }
    };

    const canPayment = rideStatus === 'PICKED' && paymentStatus === 'UNPAID';

    return (
        <Card className='w-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
            <CardHeader className='pb-3'>
                <div className='flex items-start justify-between gap-2'>
                    <CardTitle className='text-lg font-semibold text-gray-800'>
                        Payment Details
                    </CardTitle>

                    <div
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap ${getStatusColor()}`}
                    >
                        {getStatusIcon()}
                        <span>{paymentStatus}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className='space-y-3'>
                <div className='space-y-2 pb-3 border-b border-gray-200'>
                    {/* Pickup location */}
                    <div className='flex items-start gap-3'>
                        <MapPin className='w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0' />
                        <div className='flex-1 min-w-0'>
                            <p className='text-xs text-gray-500'>From</p>
                            <p className='text-sm font-medium text-gray-800 truncate'>
                                {pickupLocation}
                            </p>
                        </div>
                    </div>

                    {/* Drop location */}
                    <div className='flex items-start gap-3'>
                        <MapPin className='w-4 h-4 text-red-500 mt-0.5 flex-shrink-0' />
                        <div className='flex-1 min-w-0'>
                            <p className='text-xs text-gray-500'>To</p>
                            <p className='text-sm font-medium text-gray-800 truncate'>
                                {dropLocation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Amount section */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <DollarSign className='w-4 h-4 text-green-500' />
                        <span className='text-sm text-gray-600'>Amount</span>
                    </div>
                    <span className='text-xl font-bold text-gray-900'>
                        {amount} TK
                    </span>
                </div>

                {rideStatus !== 'PICKED' && (
                    <div className='p-2 bg-blue-50 border border-blue-200 rounded-lg'>
                        <p className='text-xs text-blue-700 flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            Payment will be available after driver picks up
                        </p>
                    </div>
                )}

                <Button
                    onClick={handlePayment}
                    disabled={!canPayment || isLoading}
                    className={`w-full h-10 text-sm font-medium transition-all ${
                        canPayment
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {isLoading && (
                        <span className='flex items-center gap-2'>
                            <span className='w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin' />
                            Processing...
                        </span>
                    )}
                    {!isLoading &&
                        paymentStatus === 'PAID' &&
                        '✓ Payment Complete'}
                    {!isLoading &&
                        paymentStatus === 'FAILED' &&
                        'Retry Payment'}
                    {!isLoading &&
                        paymentStatus === 'UNPAID' &&
                        !canPayment &&
                        'Waiting...'}
                    {!isLoading && canPayment && 'Pay Now'}
                </Button>

                {isError && (
                    <p className='text-xs text-red-600 mt-2'>
                        {(error as any)?.data?.message ||
                            'Payment initiation failed'}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export default PaymentCard;
