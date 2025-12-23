import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { Navigate } from 'react-router';
import { toast } from 'sonner';
import { useUserInfoQuery } from '../../Redux/Features/Auth/auth.api';
import { useCreateRideMutation } from '../../Redux/Features/Ride/ride.api';
import NavigateHome from '../../Utils/NavigateHome';

const CreateRideDashboard = () => {
    const { data } = useUserInfoQuery(undefined);
    // console.log('User Info:', data);
    const [createRide] = useCreateRideMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const pickupLocation = String(formData.get('pickupLocation') || '');
        const dropLocation = String(formData.get('dropLocation') || '');
        const payment = String(formData.get('payment') || '');

        if (!pickupLocation || !dropLocation || !payment) {
            // console.error('All fields are required');
            toast.error('All fields are required');
            return;
        }

        if (!data) {
            toast.error('User not found');
            <Navigate to='/login' replace />;
            return;
        }

        if (
            data?.data?.data?.role !== 'RIDER' &&
            data?.data?.data?.role !== 'ADMIN'
        ) {
            toast.error(
                'You are not authorized to create a ride. Only riders, admin can create rides.'
            );
            return;
        }

        const rideData = {
            pickupLocation,
            dropLocation,
            payment: parseFloat(payment),
            user: data?.data?.data?._id,
        };
        console.log('Ride Data:', rideData);

        try {
            await createRide(rideData)
                .unwrap()
                .then(() => {
                    toast.success('Ride created successfully');
                })
                .catch((error) => {
                    console.error('Error creating ride:', error);
                    toast.error('Failed to create ride');
                });
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`An error occurred: ${error.message}`);
            } else {
                toast.error('An unknown error occurred');
            }
        }

        event.currentTarget.reset();
    };

    return (
        <div className=''>
            <div className=''>
                <NavigateHome />
            </div>
            <div className='flex flex-col md:flex-row items-center justify-center gap-20 my-10'>
                {/* <div className='flex-2'>
                <img src={image} alt='Ride Sharing' className='rounded-2xl' />
            </div> */}
                <div className='flex flex-1 flex-col text-center items-center justify-between gap-10 my-10'>
                    <div className='space-y-4'>
                        <h1 className='text-3xl font-bold'>
                            Create a New Ride
                        </h1>
                        <p className='font-medium'>
                            Fill in the details below to create a new ride.
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button type='button' variant='outline'>
                                Create Ride
                            </Button>
                        </DialogTrigger>

                        <DialogContent className='sm:max-w-[425px]'>
                            <DialogHeader>
                                <DialogTitle>Create Ride</DialogTitle>
                                <DialogDescription>
                                    Please fill in the details below to create a
                                    new ride.
                                </DialogDescription>
                            </DialogHeader>

                            <form
                                onSubmit={handleSubmit}
                                className='grid gap-4 mt-4'
                            >
                                <div className='grid gap-3'>
                                    <Label htmlFor='pickupLocation'>
                                        Pickup Location
                                    </Label>
                                    <Input
                                        id='pickupLocation'
                                        name='pickupLocation'
                                        placeholder='Enter pickup location'
                                        required
                                    />
                                </div>

                                <div className='grid gap-3'>
                                    <Label htmlFor='dropLocation'>
                                        Drop Location
                                    </Label>
                                    <Input
                                        id='dropLocation'
                                        name='dropLocation'
                                        placeholder='Enter drop location'
                                        required
                                    />
                                </div>

                                <div className='grid gap-3'>
                                    <Label htmlFor='payment'>Payment</Label>
                                    <Input
                                        id='payment'
                                        name='payment'
                                        type='number'
                                        placeholder='Enter amount'
                                        required
                                    />
                                </div>

                                <DialogFooter className='mt-4 flex justify-end gap-2'>
                                    <DialogClose asChild>
                                        <Button variant='outline' type='button'>
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type='submit'>Create</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CreateRideDashboard;
