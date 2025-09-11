import { RxUpdate } from 'react-icons/rx';
import {
    useGetRideQuery,
    useRemoveRideMutation,
    useUpdateRideMutation,
} from '../../Redux/Features/Ride/ride.api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign, Flag, MapPin, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { DeleteConfirmation } from '../../components/Components/DeleteConfirmation';
import { Update } from '../../components/Components/Update';
import Loading from '../../components/Loading';
import { Button } from '../../components/ui/button';

type RideInfo = {
    pickupLocation?: string;
    dropLocation?: string;
    status?: string;
    payment?: number;
    createdAt?: string;
};

const GetMyRide = () => {
    const { data, error, isLoading } = useGetRideQuery(undefined);
    const [removeRide] = useRemoveRideMutation();
    const [updateRide] = useUpdateRideMutation();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [fareMin, setFareMin] = useState('');
    const [fareMax, setFareMax] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const items = data?.data?.rides?.result || [];
    const activeRides = items.filter(
        (ride: { status: string }) => ride.status !== 'COMPLETED'
    );

    const filteredRides = useMemo(() => {
        return activeRides.filter(
            (ride: {
                pickupLocation: string;
                dropLocation: string;
                status: string;
                payment: number;
                createdAt: string | number | Date;
            }) => {
                const matchesSearch =
                    ride.pickupLocation
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                    ride.dropLocation
                        ?.toLowerCase()
                        .includes(search.toLowerCase());

                const matchesStatus =
                    statusFilter === 'ALL' || ride.status === statusFilter;

                const matchesFare =
                    (!fareMin || ride.payment >= Number(fareMin)) &&
                    (!fareMax || ride.payment <= Number(fareMax));

                const rideDate = ride.createdAt
                    ? new Date(ride.createdAt)
                    : null;
                const matchesDate =
                    (!dateFrom ||
                        (rideDate && rideDate >= new Date(dateFrom))) &&
                    (!dateTo || (rideDate && rideDate <= new Date(dateTo)));

                return (
                    matchesSearch && matchesStatus && matchesFare && matchesDate
                );
            }
        );
    }, [activeRides, search, statusFilter, fareMin, fareMax, dateFrom, dateTo]);

    // Pagination
    const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
    const paginatedRides = filteredRides.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleUpdateRide = async (rideId: string, rideInfo: RideInfo) => {
        const toastId = toast.loading('Updating...');
        try {
            const res = await updateRide({ rideId, rideInfo }).unwrap();
            if (res.success) {
                toast.success('Updated successfully', { id: toastId });
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to update ride', { id: toastId });
        }
    };

    const handleRemoveRide = async (rideId: string) => {
        const toastId = toast.loading('Removing...');
        try {
            const res = await removeRide(rideId).unwrap();
            if (res.success) {
                toast.success('Removed', { id: toastId });
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to remove ride', { id: toastId });
        }
    };

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
        return (
            <div className='text-center text-gray-500'>No rides available.</div>
        );

    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className='text-center my-6 space-y-3'>
                <h1 className='text-3xl font-bold'>My Rides</h1>
                <p className='text-gray-600'>
                    Manage your ongoing rides below.
                </p>
            </div>

            {/* Filters */}
            <div className='border p-4 rounded-lg shadow mb-6 space-y-4'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <input
                        type='text'
                        placeholder='Search by location...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='border p-2 rounded w-full'
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className='border p-2 rounded dark:bg-black'
                    >
                        <option value='ALL'>All Status</option>
                        <option value='PENDING'>Pending</option>
                        <option value='PICKED'>Picked</option>
                        <option value='CANCELLED'>Cancelled</option>
                    </select>
                    <input
                        type='number'
                        placeholder='Min Fare'
                        value={fareMin}
                        onChange={(e) => setFareMin(e.target.value)}
                        className='border p-2 rounded w-24'
                    />
                    <input
                        type='number'
                        placeholder='Max Fare'
                        value={fareMax}
                        onChange={(e) => setFareMax(e.target.value)}
                        className='border p-2 rounded w-24'
                    />
                    <input
                        type='date'
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className='border p-2 rounded'
                    />
                    <input
                        type='date'
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className='border p-2 rounded'
                    />
                </div>
            </div>

            {/* Ride List */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {paginatedRides.map(
                    (item: {
                        _id?: string;
                        pickupLocation: string;
                        dropLocation: string;
                        payment: number;
                        status?: string;
                    }) => (
                        <Card
                            key={item._id}
                            className='shadow-lg border rounded-2xl hover:shadow-xl transition'
                        >
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2 text-lg'>
                                    <Clock
                                        className='text-amber-500'
                                        size={20}
                                    />
                                    Active Ride
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-3'>
                                <div className='flex items-center gap-2'>
                                    <MapPin
                                        className='text-blue-500'
                                        size={18}
                                    />
                                    <span className='font-medium'>Pickup:</span>
                                    <span>{item.pickupLocation}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Flag className='text-red-500' size={18} />
                                    <span className='font-medium'>Drop:</span>
                                    <span>{item.dropLocation}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <DollarSign
                                        className='text-green-500'
                                        size={18}
                                    />
                                    <span className='font-medium'>Amount:</span>
                                    <span>$ {item.payment}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='font-medium'>Status:</span>
                                    <span className='text-amber-600'>
                                        {item.status}
                                    </span>
                                </div>

                                <div className='flex justify-between gap-4 pt-2'>
                                    <Update
                                        ride={item}
                                        onConfirm={(rideInfo) =>
                                            item._id
                                                ? handleUpdateRide(
                                                      item._id,
                                                      rideInfo
                                                  )
                                                : toast.error(
                                                      'Ride ID is missing'
                                                  )
                                        }
                                    >
                                        <Button
                                            size='sm'
                                            className='bg-amber-300 hover:bg-amber-500 flex items-center gap-2'
                                        >
                                            <RxUpdate size={18} />
                                            <span>Update</span>
                                        </Button>
                                    </Update>

                                    <DeleteConfirmation
                                        onConfirm={() =>
                                            item._id
                                                ? handleRemoveRide(item._id)
                                                : toast.error(
                                                      'Ride ID is missing'
                                                  )
                                        }
                                    >
                                        <Button
                                            size='sm'
                                            className='bg-red-300 hover:bg-red-500 flex items-center gap-2'
                                        >
                                            <Trash2 size={18} />
                                            <span>Delete</span>
                                        </Button>
                                    </DeleteConfirmation>
                                </div>
                            </CardContent>
                        </Card>
                    )
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='flex justify-center items-center gap-4 mt-8'>
                    <Button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        variant='outline'
                    >
                        Prev
                    </Button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        variant='outline'
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default GetMyRide;
