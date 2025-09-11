import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { useGetMyPickQuery } from '../../Redux/Features/Driver/driver.api';
import Card from './Card';

const GetMyPick = () => {
    const { data, isLoading, isError } = useGetMyPickQuery(undefined);

    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    // filter state: "PICKED" | "COMPLETED" | "CANCELLED"
    const [filter, setFilter] = useState<'PICKED' | 'COMPLETED' | 'CANCELLED'>(
        'PICKED'
    );

    const picks = data?.data || [];

    const filteredPicks = picks.filter(
        (pick: { status: string }) => pick.status === filter
    );

    // Pagination
    const totalPages = Math.ceil(filteredPicks.length / itemsPerPage);
    const paginatedPicks = filteredPicks.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className='p-6'>
            <div className='text-center my-10'>
                <h2 className='text-2xl font-bold mb-4'>My Pick</h2>
                <p className='text-gray-600'>
                    Details about my current pick will be displayed here.
                </p>
            </div>

            {/* Filter buttons */}
            <div className='flex justify-center gap-4 mb-6'>
                <Button
                    variant={filter === 'PICKED' ? 'default' : 'outline'}
                    onClick={() => {
                        setFilter('PICKED');
                        setPage(1); // reset page
                    }}
                >
                    Picked
                </Button>
                <Button
                    variant={filter === 'COMPLETED' ? 'default' : 'outline'}
                    onClick={() => {
                        setFilter('COMPLETED');
                        setPage(1);
                    }}
                >
                    Completed
                </Button>
                <Button
                    variant={filter === 'CANCELLED' ? 'default' : 'outline'}
                    onClick={() => {
                        setFilter('CANCELLED');
                        setPage(1);
                    }}
                >
                    Cancelled
                </Button>
            </div>

            {isLoading && (
                <p className='text-center text-gray-500'>Loading...</p>
            )}
            {isError && (
                <p className='text-center text-red-500'>
                    Failed to load picks!
                </p>
            )}

            {!isLoading && !isError && (
                <>
                    {filteredPicks.length === 0 ? (
                        <p className='text-center text-gray-600 dark:text-gray-300'>
                            No {filter.toLowerCase()} picks available.
                        </p>
                    ) : (
                        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                            {paginatedPicks.map((pick: any) => (
                                <Card key={pick._id} pick={pick} />
                            ))}
                        </div>
                    )}
                </>
            )}

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

export default GetMyPick;
