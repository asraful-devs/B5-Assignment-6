import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const Paymentpage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>(
        'loading'
    );
    const paymentUrl = searchParams.get('url');

    useEffect(() => {
        if (!paymentUrl) {
            setStatus('error');
            return;
        }

        // Short delay to show the UI before redirecting
        const timer = setTimeout(() => {
            setStatus('redirecting');
            try {
                const decodedUrl = decodeURIComponent(paymentUrl);
                console.log('🔗 Redirecting to:', decodedUrl);
                window.location.href = decodedUrl;
            } catch (error) {
                console.error('❌ URL decode error:', error);
                setStatus('error');
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [paymentUrl]);

    if (status === 'error' || !paymentUrl) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-red-900 p-4'>
                <Card className='w-full max-w-md shadow-xl'>
                    <CardHeader className='text-center'>
                        <div className='mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4'>
                            <AlertCircle className='w-8 h-8 text-red-600 dark:text-red-400' />
                        </div>
                        <CardTitle className='text-2xl font-bold text-red-600 dark:text-red-400'>
                            Payment Error
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <p className='text-center text-gray-600 dark:text-gray-400'>
                            No payment URL found. Please try again.
                        </p>
                        <Button
                            onClick={() =>
                                navigate('/dashboard/rider/payments')
                            }
                            className='w-full bg-blue-600 hover:bg-blue-700'
                        >
                            Go Back to Payment Page
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 p-4'>
            <Card className='w-full max-w-md shadow-xl'>
                <CardHeader className='text-center'>
                    <div className='mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 animate-pulse'>
                        {status === 'redirecting' ? (
                            <CheckCircle className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                        ) : (
                            <Loader2 className='w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin' />
                        )}
                    </div>
                    <CardTitle className='text-2xl font-bold text-gray-800 dark:text-white'>
                        {status === 'redirecting'
                            ? 'Redirecting to Payment Gateway'
                            : 'Processing Payment'}
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='space-y-3'>
                        <div className='flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg'>
                            <div className='w-2 h-2 bg-blue-600 rounded-full animate-pulse' />
                            <p className='text-sm text-gray-700 dark:text-gray-300'>
                                Connecting to SSL Commerz
                            </p>
                        </div>

                        {status === 'redirecting' && (
                            <div className='flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg'>
                                <CheckCircle className='w-4 h-4 text-green-600' />
                                <p className='text-sm text-gray-700 dark:text-gray-300'>
                                    Payment gateway ready
                                </p>
                            </div>
                        )}
                    </div>

                    <div className='pt-4 border-t dark:border-gray-700'>
                        <p className='text-xs text-center text-gray-500 dark:text-gray-400'>
                            Please wait while we redirect you to the secure
                            payment gateway...
                        </p>
                    </div>

                    <div className='text-center'>
                        <p className='text-xs text-gray-400 dark:text-gray-500'>
                            You will be redirected automatically
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Paymentpage;
