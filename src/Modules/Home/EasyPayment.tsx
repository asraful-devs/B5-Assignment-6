import { CheckCircle, CreditCard, Shield, Zap } from 'lucide-react';

const EasyPayment = () => {
    return (
        <div className='py-16 px-4 md:px-8'>
            <div className='container mx-auto max-w-7xl'>
                {/* Header */}
                <div className='text-center mb-12 space-y-3'>
                    <h2 className='text-3xl md:text-4xl font-bold'>
                        Easy Payment
                    </h2>
                    <p className='text-muted-foreground font-semibold max-w-2xl mx-auto'>
                        Pay safely with SSL Commerz. Fast, secure & reliable
                        payments for your rides. Complete your payment in just a
                        few clicks.
                    </p>
                </div>

                {/* Steps Section */}
                <div className='max-w-3xl mx-auto'>
                    {/* Step Cards */}
                    <div className='space-y-4'>
                        {/* Step 1 */}
                        <div className='flex gap-6 p-5 border border-blue-100 hover:border-amber-500 rounded-lg hover:shadow-md transition-all duration-200'>
                            <div className='flex-shrink-0'>
                                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white font-bold text-lg'>
                                    1
                                </div>
                            </div>
                            <div className='flex-1 space-y-2'>
                                <h3 className='text-lg font-semibold flex items-center gap-2'>
                                    <Zap className='w-5 h-5 text-amber-500' />
                                    Your Ride is Picked
                                </h3>
                                <p className='text-muted-foreground font-semibold'>
                                    Once a driver accepts your ride request,
                                    you'll see the payment option activated.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className='flex gap-6 p-5 border border-blue-100 hover:border-amber-500 rounded-lg hover:shadow-md transition-all duration-200'>
                            <div className='flex-shrink-0'>
                                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white font-bold text-lg'>
                                    2
                                </div>
                            </div>
                            <div className='flex-1 space-y-2'>
                                <h3 className='text-lg font-semibold flex items-center gap-2'>
                                    <CreditCard className='w-5 h-5 text-amber-500' />
                                    Click "Pay Now"
                                </h3>
                                <p className='text-muted-foreground font-semibold'>
                                    Look for the "Pay Now" button in your rider
                                    payment section and click it.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className='flex gap-6 p-5 border border-blue-100 hover:border-amber-500 rounded-lg hover:shadow-md transition-all duration-200'>
                            <div className='flex-shrink-0'>
                                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white font-bold text-lg'>
                                    3
                                </div>
                            </div>
                            <div className='flex-1 space-y-2'>
                                <h3 className='text-lg font-semibold flex items-center gap-2'>
                                    <Shield className='w-5 h-5 text-amber-500' />
                                    Complete Secure Payment
                                </h3>
                                <p className='text-muted-foreground font-semibold'>
                                    You'll be redirected to SSL Commerz. Enter
                                    your payment details securely.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className='flex gap-6 p-5 border border-blue-100 hover:border-amber-500 rounded-lg hover:shadow-md transition-all duration-200'>
                            <div className='flex-shrink-0'>
                                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white font-bold text-lg'>
                                    4
                                </div>
                            </div>
                            <div className='flex-1 space-y-2'>
                                <h3 className='text-lg font-semibold flex items-center gap-2'>
                                    <CheckCircle className='w-5 h-5 text-green-500' />
                                    Payment Complete
                                </h3>
                                <p className='text-muted-foreground font-semibold'>
                                    After successful payment, your ride status
                                    updates to PAID automatically.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SSL Commerz Footer */}
                    <div className='text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
                        <p className='text-sm text-muted-foreground font-semibold mb-2'>
                            Powered by
                        </p>
                        <p className='text-xl font-bold text-amber-600 dark:text-amber-400'>
                            SSL Commerz
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EasyPayment;
