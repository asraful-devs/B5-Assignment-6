import { FaCar, FaMotorcycle, FaUserShield } from 'react-icons/fa';

const Capabilities = () => {
    const capabilities = [
        {
            role: 'Admin',
            icon: (
                <FaUserShield
                    size={40}
                    className='text-blue-600 dark:text-blue-400'
                />
            ),
            bg: 'bg-gray-100 dark:bg-gray-800',
            permissions: [
                'Full access to the system',
                'Manage Drivers and Riders, control permissions',
                'Create, view, update, and delete any rides or posts',
                'Access dashboards with analytics and insights',
                'Monitor all system activities and overview operations',
            ],
        },
        {
            role: 'Driver',
            icon: (
                <FaCar
                    size={40}
                    className='text-green-600 dark:text-green-400'
                />
            ),
            bg: 'bg-gray-100 dark:bg-gray-800',
            permissions: [
                'View available rides and accept assignments',
                'Track assigned rides and their status',
                'Cannot update or delete posts created by others',
            ],
        },
        {
            role: 'Rider',
            icon: (
                <FaMotorcycle
                    size={40}
                    className='text-purple-600 dark:text-purple-400'
                />
            ),
            bg: 'bg-gray-100 dark:bg-gray-800',
            permissions: [
                'Create their own ride posts',
                'View details of their own rides',
                'Update or delete their own posts',
                'Cannot access posts or analytics of other users',
            ],
        },
    ];

    return (
        <div className='py-10 px-5 '>
            <h2 className='text-2xl mt-5 font-bold text-center py-3 text-gray-800 dark:text-gray-100'>
                Our Capabilities
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
                {capabilities.map((cap, index) => (
                    <div
                        key={index}
                        className={`${cap.bg} shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition h-full`}
                    >
                        <div className='mb-4'>{cap.icon}</div>
                        <h3 className='text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100'>
                            {cap.role}
                        </h3>
                        <ul className='list-disc text-left list-inside space-y-2 text-gray-700 dark:text-gray-300 flex-grow'>
                            {cap.permissions.map((perm, i) => (
                                <li key={i}>{perm}</li>
                            ))}
                        </ul>
                        <button className=' mt-8 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition'>
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Capabilities;
