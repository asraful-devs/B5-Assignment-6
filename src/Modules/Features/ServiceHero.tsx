import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Percent, ShieldCheck, Star, Users } from 'lucide-react';

export default function ServiceHero() {
    return (
        <section className='w-full relative'>
            <div className='max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                {/* Left Content */}
                <div className='space-y-6'>
                    <span className='bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full font-medium'>
                        Special Offers
                    </span>

                    <h1 className='text-4xl lg:text-5xl font-extrabold leading-snug'>
                        Choose Your Perfect <br />
                        <span className='text-yellow-500'>Rental Package</span>
                    </h1>

                    <p className='text-gray-500 leading-relaxed max-w-lg'>
                        Discover our tailored rental packages designed to meet
                        your every need. From weekend getaways to long-term
                        business solutions, we’ve got you covered.
                    </p>

                    {/* Features */}
                    <div className='grid grid-cols-2 gap-4 max-w-md'>
                        <div className='flex items-center gap-2'>
                            <Clock className='text-yellow-500' size={22} />
                            <span className='text-sm font-medium'>
                                Flexible Duration
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <ShieldCheck className='text-green-500' size={22} />
                            <span className='text-sm font-medium'>
                                Full Insurance
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold'>
                                24/7
                            </span>
                            <span className='text-sm font-medium'>
                                24/7 Support
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Percent className='text-cyan-500' size={22} />
                            <span className='text-sm font-medium'>
                                Best Rates
                            </span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-4 pt-4'>
                        <a href='/about/prices-plans' className=''>
                            <Button className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg'>
                                VIEW PACKAGES
                            </Button>
                        </a>
                        <Button
                            variant='outline'
                            className='border-gray-300 px-6 py-3 rounded-xl font-semibold shadow-sm'
                        >
                            CUSTOMIZE PACKAGE
                        </Button>
                    </div>
                </div>

                {/* Right Content (Car + Badges) */}
                <div className='relative flex justify-center'>
                    <img
                        src='https://files.catbox.moe/pgrq9r.webp'
                        alt='Car rental'
                        className='object-contain'
                    />

                    {/* Badge: Customer Rating */}
                    <Card className='absolute top-6 right-10 shadow-lg'>
                        <CardContent className='flex items-center gap-2 px-4 py-2'>
                            <Star className='text-yellow-500' size={20} />
                            <div>
                                <p className='text-sm font-semibold'>4.9/5</p>
                                <span className='text-xs text-gray-500'>
                                    Customer Rating
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Badge: Happy Customers */}
                    <Card className='absolute bottom-6 left-6 shadow-lg'>
                        <CardContent className='flex items-center gap-2 px-4 py-2'>
                            <Users className='text-green-600' size={20} />
                            <div>
                                <p className='text-sm font-semibold'>10K+</p>
                                <span className='text-xs text-gray-500'>
                                    Happy Customers
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
