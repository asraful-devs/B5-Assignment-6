/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
    useGetAllContactQuery,
    useRemoveContactMutation,
} from '../../Redux/Features/Contact/contact.api';
import NavigateHome from '../../Utils/NavigateHome';

const ContactMessages = () => {
    const { data, isLoading, refetch } = useGetAllContactQuery(undefined);
    const [removeContact, { isLoading: isDeleting }] =
        useRemoveContactMutation();

    if (isLoading)
        return (
            <p className='text-center py-10 text-muted-foreground'>
                Loading contact messages...
            </p>
        );

    const messages = data?.data || [];

    const handleDelete = async (id: string) => {
        try {
            await removeContact(id).unwrap();
            toast.success('Message deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete message');
            console.error(error);
        }
    };

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <h2 className='text-3xl font-bold'>Contact Messages</h2>
                <NavigateHome />
            </div>

            {messages.length === 0 ? (
                <Card className='p-8 text-center'>
                    <p className='text-muted-foreground'>
                        No contact messages yet.
                    </p>
                </Card>
            ) : (
                <div className='grid gap-4'>
                    {messages.map((message: any) => (
                        <Card
                            key={message._id}
                            className='p-4 md:p-6 hover:shadow-md transition-shadow'
                        >
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                <div>
                                    <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1'>
                                        Name
                                    </p>
                                    <p className='font-semibold text-base'>
                                        {message.name}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1'>
                                        Email
                                    </p>
                                    <p className='font-semibold text-base break-all'>
                                        {message.email}
                                    </p>
                                </div>
                            </div>

                            {message.phone && (
                                <div className='mb-4'>
                                    <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1'>
                                        Phone
                                    </p>
                                    <p className='text-sm'>{message.phone}</p>
                                </div>
                            )}

                            {message.subject && (
                                <div className='mb-4'>
                                    <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1'>
                                        Subject
                                    </p>
                                    <p className='text-sm font-medium'>
                                        {message.subject}
                                    </p>
                                </div>
                            )}

                            <div className='mb-4'>
                                <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1'>
                                    Message
                                </p>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    {message.message}
                                </p>
                            </div>

                            <div className='flex items-center justify-between pt-4 border-t'>
                                <p className='text-xs text-muted-foreground'>
                                    {new Date(
                                        message.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={() => handleDelete(message._id)}
                                    disabled={isDeleting}
                                    className='text-destructive hover:text-destructive hover:bg-destructive/10'
                                >
                                    <Trash2 className='w-4 h-4' />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactMessages;
