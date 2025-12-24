import {
    useConfirmPaymentMutation,
    useRefetchRideDataMutation,
} from '@/Redux/Features/Payment/payment.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [refetchRideData] = useRefetchRideDataMutation();
    const [confirmPayment] = useConfirmPaymentMutation();

    const transactionId = searchParams.get('transactionId');
    const amount = searchParams.get('amount');
    const message = searchParams.get('message');
    const rideId = searchParams.get('rideId');
    const paymentUrl = searchParams.get('paymentUrl');

    useEffect(() => {
        if (transactionId && rideId) {
            console.log(
                '✅ Payment Success - Confirming and refetching ride data...'
            );

            const handlePaymentConfirmation = async () => {
                try {
                    await confirmPayment(rideId).unwrap();
                    console.log('✅ Payment confirmed on backend');

                    await refetchRideData(rideId).unwrap();
                    console.log(
                        '✅ Ride data refetched - payment status should be PAID now'
                    );
                } catch (error) {
                    console.error('❌ Error confirming payment:', error);
                    // ✅ Even if error, still refetch to get latest data
                    refetchRideData(rideId);
                }
            };

            handlePaymentConfirmation();
        } else if (transactionId) {
            console.log(
                '✅ Payment Success - Refetching ride data (no rideId)'
            );
            refetchRideData(transactionId);
        }
    }, [transactionId, rideId, confirmPayment, refetchRideData]);

    return (
        <div className='min-h-screen dark:bg-gray-900 bg-gray-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <Card className='dark:bg-gray-800 dark:border-gray-700 border-2 border-green-200'>
                    <CardHeader className='text-center'>
                        <div className='flex justify-center mb-4'>
                            {/* ✅ Success state - green checkmark */}
                            <CheckCircle className='w-12 h-12 dark:text-green-400 text-green-600' />
                        </div>

                        <CardTitle className='dark:text-white text-gray-900'>
                            Payment Successful! ✅
                        </CardTitle>
                    </CardHeader>

                    <CardContent className='space-y-6'>
                        {/* ✅ Success Message */}
                        <div className='dark:bg-green-900 bg-green-50 p-4 rounded-lg'>
                            <p className='dark:text-green-200 text-green-700 text-sm text-center font-medium'>
                                {message ||
                                    'Your payment has been processed successfully. Your ride payment is confirmed.'}
                            </p>
                        </div>

                        {/* ✅ Transaction Details */}
                        {(transactionId || amount) && (
                            <div className='space-y-2 dark:bg-gray-700 bg-gray-100 p-3 rounded'>
                                {transactionId && (
                                    <div className='flex justify-between items-center'>
                                        <span className='dark:text-gray-300 text-gray-700 text-sm'>
                                            Transaction ID:
                                        </span>
                                        <span className='dark:text-white text-gray-900 text-xs font-mono break-all'>
                                            {transactionId}
                                        </span>
                                    </div>
                                )}

                                {amount && (
                                    <div className='flex justify-between items-center pt-2 border-t dark:border-gray-600'>
                                        <span className='dark:text-gray-300 text-gray-700 text-sm'>
                                            Amount Paid:
                                        </span>
                                        <span className='dark:text-green-400 text-green-600 font-bold'>
                                            {amount} TK
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ✅ Success Confirmation */}
                        <div className='dark:bg-gray-700 bg-gray-100 p-3 rounded border-l-4 dark:border-green-500 border-green-600'>
                            <p className='text-xs dark:text-gray-300 text-gray-700'>
                                ✓ Payment has been recorded in your account
                                <br />
                                ✓ Your ride driver will be notified
                                <br />✓ Driver can now complete the ride
                            </p>
                        </div>

                        {/* ✅ Action Buttons */}
                        <div className='space-y-2'>
                            {paymentUrl && (
                                <Button
                                    onClick={() => {
                                        window.open(paymentUrl, '_blank');
                                    }}
                                    className='w-full dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2'
                                >
                                    <span>Go to Payment</span>
                                    <ExternalLink className='w-4 h-4' />
                                </Button>
                            )}

                            <Button
                                onClick={() =>
                                    navigate('/dashboard/rider/payments')
                                }
                                className='w-full dark:bg-green-600 dark:hover:bg-green-700 bg-green-600 hover:bg-green-700 text-white font-medium'
                            >
                                View My Payments
                            </Button>

                            <Button
                                onClick={() =>
                                    navigate('/dashboard/rider/get-rides')
                                }
                                variant='outline'
                                className='w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600'
                            >
                                View My Rides
                            </Button>
                        </div>

                        {/* ✅ Help text */}
                        <p className='text-xs dark:text-gray-400 text-gray-600 text-center'>
                            Payment data synced to your account. You can check
                            the status in your payments section.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
