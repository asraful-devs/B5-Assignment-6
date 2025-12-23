import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateContactMutation } from '../../Redux/Features/Contact/contact.api';

const Contact = () => {
    const [createContact] = useCreateContactMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.message ||
            !formData.subject
        ) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsLoading(true);

        try {
            await createContact(formData).unwrap();
            // console.log('Form data:', formData);
            toast.success(
                'Your message has been sent. We will get back to you soon!'
            );

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='py-12'>
            {/* Title Section */}
            <div className='mb-12 text-center'>
                <h1 className='text-4xl font-bold mb-3'>Contact Us</h1>
                <p className='text-muted-foreground text-lg'>
                    Have questions? We'd love to hear from you. Send us a
                    message!
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* Contact Info */}
                <div className='space-y-8'>
                    <div className='flex gap-4'>
                        <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                            <svg
                                className='w-6 h-6 text-primary'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className='font-semibold mb-1'>Email</h3>
                            <p className='text-muted-foreground'>
                                work.mdasraful56@gmail.com
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                            <svg
                                className='w-6 h-6 text-primary'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.029a11.042 11.042 0 01-5.516 5.516l-1.029-2.048a1 1 0 00-.756-.502l-4.493-1.498a1 1 0 00-.684-.948A2 2 0 013 9V5z'
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className='font-semibold mb-1'>Phone</h3>
                            <p className='text-muted-foreground'>
                                +880 1889245756
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                            <svg
                                className='w-6 h-6 text-primary'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                                />
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className='font-semibold mb-1'>Address</h3>
                            <p className='text-muted-foreground'>
                                Shariatpur, Dhaka 1200
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='space-y-2'>
                        <Label htmlFor='name'>Name *</Label>
                        <Input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Your full name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email *</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='your@email.com'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='phone'>Phone</Label>
                        <Input
                            id='phone'
                            name='phone'
                            type='tel'
                            placeholder='Your phone number'
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='subject'>Subject *</Label>
                        <Input
                            id='subject'
                            name='subject'
                            type='text'
                            placeholder='What is this about?'
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='message'>Message *</Label>
                        <textarea
                            id='message'
                            name='message'
                            placeholder='Your message here...'
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className='w-full px-3 py-2 border border-input rounded-md bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                        />
                    </div>

                    <Button
                        type='submit'
                        disabled={isLoading}
                        className='w-full'
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
