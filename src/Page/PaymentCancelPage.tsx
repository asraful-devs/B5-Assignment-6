import { useRefetchRideDataMutation } from '@/Redux/Features/Payment/payment.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const PaymentCancelPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [refetchRideData] = useRefetchRideDataMutation();

    const transactionId = searchParams.get('transactionId');
    const amount = searchParams.get('amount');
    const message = searchParams.get('message');
    const rideId = searchParams.get('rideId');
    const paymentUrl = searchParams.get('paymentUrl');

    useEffect(() => {
        if (transactionId && rideId) {
            console.log(
                '⚠️ Payment Cancelled - Refetching ride data for rideId:',
                rideId
            );
            refetchRideData(rideId);
        }
    }, [transactionId, rideId, refetchRideData]);

    return (
        <div className='min-h-screen dark:bg-gray-900 bg-gray-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <Card className='dark:bg-gray-800 dark:border-gray-700 border-2 border-yellow-200'>
                    <CardHeader className='text-center'>
                        <div className='flex justify-center mb-4'>
                            {/* ✅ Cancelled icon */}
                            <AlertCircle className='w-12 h-12 dark:text-yellow-400 text-yellow-600' />
                        </div>

                        <CardTitle className='dark:text-white text-gray-900'>
                            Payment Cancelled
                        </CardTitle>
                    </CardHeader>

                    <CardContent className='space-y-6'>
                        {/* ✅ Message */}
                        <div className='dark:bg-yellow-900 bg-yellow-50 p-4 rounded-lg border dark:border-yellow-700 border-yellow-200'>
                            <div className='flex items-start gap-2'>
                                <Clock className='w-5 h-5 dark:text-yellow-300 text-yellow-600 flex-shrink-0 mt-0.5' />
                                <div>
                                    <p className='dark:text-yellow-200 text-yellow-700 text-sm font-medium mb-1'>
                                        Payment Cancelled
                                    </p>
                                    <p className='dark:text-yellow-300 text-yellow-600 text-xs'>
                                        {message ||
                                            'You have cancelled the payment process. No charge has been made to your account.'}
                                    </p>
                                </div>
                            </div>
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
                                            Amount:
                                        </span>
                                        <span className='dark:text-blue-400 text-blue-600 font-bold'>
                                            {amount} TK
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ✅ Info box */}
                        <div className='dark:bg-gray-700 bg-gray-100 p-3 rounded'>
                            <h4 className='dark:text-white text-gray-900 text-sm font-medium mb-2'>
                                What happens now?
                            </h4>
                            <p className='text-xs dark:text-gray-300 text-gray-700'>
                                Your ride remains in "Ready to Pay" status. You
                                can return to complete the payment anytime. Your
                                driver is waiting for payment confirmation.
                            </p>
                        </div>

                        {/* ✅ Action Buttons */}
                        <div className='space-y-2'>
                            {paymentUrl ? (
                                <Button
                                    onClick={() => {
                                        window.open(paymentUrl, '_blank');
                                    }}
                                    className='w-full dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2'
                                >
                                    <span>Try Payment Again</span>
                                    <ExternalLink className='w-4 h-4' />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() =>
                                        navigate('/dashboard/rider/payments')
                                    }
                                    className='w-full dark:bg-blue-600 dark:hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 text-white font-medium'
                                >
                                    Go to Payments
                                </Button>
                            )}

                            {/* ✅ Go back to rides */}
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

                        {/* ✅ Important note */}
                        <p className='text-xs dark:text-gray-400 text-gray-600 text-center border-t dark:border-gray-700 pt-4'>
                            💡 If you need help or have questions, please
                            contact our support team.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentCancelPage;
