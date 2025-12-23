import { Code2, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';

const Me = () => {
    return (
        <section className='relative py-12 sm:py-16 lg:py-24 px-4 overflow-hidden'>
            {/* Animated Background Elements */}
            <div className='absolute inset-0 -z-10'>
                <div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700'></div>
                <div className='absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
            </div>

            <div className='max-w-7xl mx-auto'>
                <div className='grid lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
                    {/* Left Side - Developer Info */}
                    <div className='order-2 lg:order-1 space-y-8'>
                        {/* Badge */}
                        <div className='inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full border border-blue-500/20 dark:border-blue-500/30'>
                            <Sparkles className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                            <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                                Full Stack Developer & Creator
                            </span>
                        </div>

                        {/* Main Heading */}
                        <div className='space-y-4'>
                            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight'>
                                Hi, I&apos;m{' '}
                                <span className='relative inline-block'>
                                    <span className='text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 animate-linear'>
                                        Md Asraful
                                    </span>
                                    <svg
                                        className='absolute -bottom-2 left-0 w-full'
                                        height='12'
                                        viewBox='0 0 200 12'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M2 10C50 2 150 2 198 10'
                                            stroke='url(#gradient)'
                                            strokeWidth='3'
                                            strokeLinecap='round'
                                        />
                                        <defs>
                                            <linearGradient
                                                id='gradient'
                                                x1='0%'
                                                y1='0%'
                                                x2='100%'
                                                y2='0%'
                                            >
                                                <stop
                                                    offset='0%'
                                                    stopColor='#3B82F6'
                                                />
                                                <stop
                                                    offset='50%'
                                                    stopColor='#9333EA'
                                                />
                                                <stop
                                                    offset='100%'
                                                    stopColor='#EC4899'
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                            </h1>

                            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300'>
                                Building Digital Experiences That{' '}
                                <span className='text-blue-600 dark:text-blue-400'>
                                    Connect People
                                </span>
                            </h2>
                        </div>

                        {/* Description */}
                        <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl'>
                            As a solo developer passionate about creating
                            meaningful connections, I built this platform from
                            the ground up to make ride sharing
                            <span className='font-semibold text-gray-900 dark:text-white'>
                                {' '}
                                simple, safe, and cost-effective
                            </span>{' '}
                            for everyone. What started as a personal project has
                            evolved into a thriving community of travelers
                            sharing journeys together.
                        </p>

                        {/* Quick Info */}
                        <div className='flex flex-wrap gap-4'>
                            <div className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700'>
                                <MapPin className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Dhaka, Bangladesh
                                </span>
                            </div>
                            {/* <div className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700'>
                                <Coffee className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Available for Projects
                                </span>
                            </div> */}
                            <div className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700'>
                                <Code2 className='w-5 h-5 text-pink-600 dark:text-pink-400' />
                                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    MERN Stack Expert
                                </span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className='flex flex-wrap gap-4 pt-4'>
                            <a
                                href='mailto:work.mdasraful56@gmail.com'
                                target='_blank'
                                className='group flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
                            >
                                <Mail className='w-5 h-5' />
                                <span className='font-semibold'>
                                    Get in Touch
                                </span>
                            </a>
                            <a
                                href='https://github.com/asraful-devs'
                                target='_blank'
                                className='group flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-slate-700'
                            >
                                <Github className='w-5 h-5' />
                                <span className='font-semibold'>
                                    View GitHub
                                </span>
                            </a>
                            <a
                                href='https://www.linkedin.com/in/asraful-devs/'
                                target='_blank'
                                className='flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-slate-700'
                            >
                                <Linkedin className='w-5 h-5' />
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Developer Photo */}
                    <div className='order-1 lg:order-2'>
                        <div className='relative'>
                            {/* Glow Effects */}
                            <div className='absolute -inset-8 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 animate-pulse'></div>

                            {/* Main Image Container */}
                            <div className='relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700 transform hover:scale-105 transition-transform duration-500'>
                                <img
                                    src='https://i.ibb.co.com/tp8ZNJVw/me-112.jpg'
                                    alt='Md Asraful - Full Stack Developer'
                                    className='w-full h-[450px] sm:h-[550px] lg:h-[650px] object-cover'
                                    width={600}
                                    height={650}
                                />

                                {/* linear Overlay */}
                                <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent'></div>

                                {/* Info Card at Bottom */}
                                <div className='absolute bottom-0 left-0 right-0 p-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-t-4 border-linear-to-r from-blue-500 via-purple-500 to-pink-500'>
                                    <div className='flex items-center gap-4'>
                                        <div className='relative'>
                                            <div className='w-16 h-16 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl'>
                                                MA
                                            </div>
                                            <div className='absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 animate-pulse'></div>
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className='text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2'>
                                                Md Asraful
                                                <span className='px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full'>
                                                    Pro
                                                </span>
                                            </h3>
                                            <p className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                                                Full Stack Developer • MERN
                                                Expert
                                            </p>
                                            <div className='flex items-center gap-2 mt-1'>
                                                <div className='flex -space-x-2'>
                                                    <div className='w-6 h-6 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 border-2 border-white dark:border-slate-800'></div>
                                                    <div className='w-6 h-6 rounded-full bg-linear-to-r from-purple-500 to-pink-500 border-2 border-white dark:border-slate-800'></div>
                                                    <div className='w-6 h-6 rounded-full bg-linear-to-r from-orange-500 to-red-500 border-2 border-white dark:border-slate-800'></div>
                                                </div>
                                                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
                                                    150+ Users Trust Me
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Tech Icons */}
                            <div className='hidden lg:block absolute -right-8 top-20 w-20 h-20 bg-blue-500 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300 items-center justify-center'>
                                <svg
                                    className='w-12 h-12 text-white'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z' />
                                </svg>
                            </div>
                            <div className='hidden lg:block absolute -left-8 bottom-32 w-20 h-20 bg-green-500 rounded-2xl shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300 items-center justify-center'>
                                <svg
                                    className='w-12 h-12 text-white'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z' />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }
                .delay-700 {
                    animation-delay: 700ms;
                }
                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </section>
    );
};

export default Me;
