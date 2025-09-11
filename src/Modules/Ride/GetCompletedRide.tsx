import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, DollarSign, Flag, MapPin } from 'lucide-react';
import { useGetRideQuery } from '../../Redux/Features/Ride/ride.api';
import Loading from '../../components/Loading';

const GetCompletedRide = () => {
    const { data, error, isLoading } = useGetRideQuery(undefined);

    const items = data?.data?.rides?.result || [];
    const completedRides = items.filter(
        (ride: { status: string }) => ride.status === 'COMPLETED'
    );

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loading />
            </div>
        );

    if (error)
        return (
            <div>
                Error:{' '}
                {typeof error === 'object' &&
                error !== null &&
                'message' in error
                    ? (error as { message: string }).message
                    : 'An error occurred.'}
            </div>
        );

    if (!data || items.length === 0)
        return <div className='text-center text-gray-500'>No rides found.</div>;

    if (completedRides.length === 0)
        return (
            <div className='text-center text-gray-500'>
                No completed rides available.
            </div>
        );

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='text-center my-6 space-y-3'>
                <h1 className='text-3xl font-bold'>Completed Rides</h1>
                <p className='text-gray-600'>
                    View all your completed rides below.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {completedRides.map((ride: any) => (
                    <Card
                        key={ride._id}
                        className='shadow-lg border rounded-2xl hover:shadow-xl transition'
                    >
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2 text-lg'>
                                <CheckCircle
                                    className='text-green-600'
                                    size={20}
                                />
                                Completed Ride
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='flex items-center gap-2'>
                                <MapPin className='text-blue-500' size={18} />
                                <span className='font-medium'>Pickup:</span>
                                <span>{ride.pickupLocation}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Flag className='text-red-500' size={18} />
                                <span className='font-medium'>Drop:</span>
                                <span>{ride.dropLocation}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <DollarSign
                                    className='text-yellow-500'
                                    size={18}
                                />
                                <span className='font-medium'>Amount:</span>
                                <span>$ {ride.payment}</span>
                            </div>

                            {/* Action Buttons
                            <div className='flex justify-end gap-3 pt-4'>
                                <Button
                                    variant='outline'
                                    className='border-red-500 text-red-500 hover:bg-red-50'
                                    onClick={() =>
                                        console.log('Delete', ride._id)
                                    }
                                >
                                    Delete
                                </Button>
                                <Button
                                    className='bg-blue-600 hover:bg-blue-700 text-white'
                                    onClick={() =>
                                        console.log('Update', ride._id)
                                    }
                                >
                                    Update
                                </Button>
                            </div> */}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default GetCompletedRide;
