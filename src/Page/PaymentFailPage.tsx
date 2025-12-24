import { useRefetchRideDataMutation } from '@/Redux/Features/Payment/payment.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ExternalLink, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const PaymentFailPage = () => {
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
                '❌ Payment Failed - Refetching ride data for rideId:',
                rideId
            );
            refetchRideData(rideId);
        }
    }, [transactionId, rideId, refetchRideData]);

    return (
        <div className='min-h-screen dark:bg-gray-900 bg-gray-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <Card className='dark:bg-gray-800 dark:border-gray-700 border-2 border-red-200'>
                    <CardHeader className='text-center'>
                        <div className='flex justify-center mb-4'>
                            {/* ✅ Error icon */}
                            <XCircle className='w-12 h-12 dark:text-red-400 text-red-600' />
                        </div>

                        <CardTitle className='dark:text-white text-gray-900'>
                            Payment Failed
                        </CardTitle>
                    </CardHeader>

                    <CardContent className='space-y-6'>
                        {/* ✅ Error Message */}
                        <div className='dark:bg-red-900 bg-red-50 p-4 rounded-lg border dark:border-red-700 border-red-200'>
                            <div className='flex items-start gap-2'>
                                <AlertTriangle className='w-5 h-5 dark:text-red-300 text-red-600 flex-shrink-0 mt-0.5' />
                                <div>
                                    <p className='dark:text-red-200 text-red-700 text-sm font-medium mb-1'>
                                        Transaction Could Not Be Completed
                                    </p>
                                    <p className='dark:text-red-300 text-red-600 text-xs'>
                                        {message ||
                                            'Your payment could not be processed. Please try again with a different payment method or contact your bank.'}
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
                                        <span className='dark:text-yellow-400 text-yellow-600 font-bold'>
                                            {amount} TK
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ✅ What went wrong */}
                        <div className='dark:bg-gray-700 bg-gray-100 p-3 rounded'>
                            <h4 className='dark:text-white text-gray-900 text-sm font-medium mb-2'>
                                Possible reasons:
                            </h4>
                            <ul className='text-xs dark:text-gray-300 text-gray-700 space-y-1 list-disc list-inside'>
                                <li>Insufficient balance in your account</li>
                                <li>Incorrect card/payment information</li>
                                <li>Payment gateway timeout</li>
                                <li>Bank declined the transaction</li>
                            </ul>
                        </div>

                        {/* ✅ Action Buttons */}
                        <div className='space-y-2'>
                            {paymentUrl ? (
                                <Button
                                    onClick={() => {
                                        window.open(paymentUrl, '_blank');
                                    }}
                                    className='w-full dark:bg-orange-600 dark:hover:bg-orange-700 bg-orange-600 hover:bg-orange-700 text-white font-medium flex items-center justify-center gap-2'
                                >
                                    <span>Retry Payment</span>
                                    <ExternalLink className='w-4 h-4' />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() =>
                                        navigate('/dashboard/rider/payments')
                                    }
                                    className='w-full dark:bg-red-600 dark:hover:bg-red-700 bg-red-600 hover:bg-red-700 text-white font-medium'
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

                            {/* ✅ Contact Support */}
                            <Button
                                onClick={() => navigate('/contact')}
                                variant='outline'
                                className='w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600'
                            >
                                Contact Support
                            </Button>
                        </div>

                        {/* ✅ Important note */}
                        <p className='text-xs dark:text-gray-400 text-gray-600 text-center border-t dark:border-gray-700 pt-4'>
                            ⚠️ Your ride payment is still pending. The driver
                            cannot complete the ride until payment is
                            successful.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentFailPage;
