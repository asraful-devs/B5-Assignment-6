import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';
import {
    useUpdateUserMutation,
    useUserInfoQuery,
} from '../Redux/Features/Auth/auth.api';

const MePage = () => {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const user = data?.data?.data;

    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    if (isLoading)
        return (
            <p className='text-center text-lg mt-20 text-gray-600 dark:text-gray-400'>
                Loading profile...
            </p>
        );

    const handleUpdate = async (field: string) => {
        try {
            let payload: Record<string, unknown> = { id: user?._id };
            if (field === 'name') payload = { id: user?._id, name };
            if (field === 'phone') payload = { id: user?._id, phone };
            if (field === 'password') {
                if (newPassword !== confirmPassword) {
                    toast.error(
                        'New password and confirm password do not match!'
                    );
                    return;
                }
                payload = { oldPassword, newPassword, id: user?._id };
            }

            await updateUser(payload).unwrap();
            toast.success(`${field} updated successfully!`);
        } catch (error) {
            console.error(error);
            toast.error('Update failed!');
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-light text-gray-900 dark:text-gray-100'>
                        Profile Settings
                    </h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                        Manage your account information and preferences
                    </p>
                </div>

                {/* Profile Info Card - Full Width */}
                <div className='mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div>
                            <p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>
                                Name
                            </p>
                            <p className='text-base text-gray-900 dark:text-gray-100'>
                                {user?.name}
                            </p>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>
                                Email
                            </p>
                            <p className='text-base text-gray-900 dark:text-gray-100'>
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>
                                Phone
                            </p>
                            <p className='text-base text-gray-900 dark:text-gray-100'>
                                {user?.phone || 'Not Added'}
                            </p>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>
                                Role
                            </p>
                            <p className='text-base text-gray-900 dark:text-gray-100 capitalize'>
                                {user?.role}
                            </p>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>
                                Status
                            </p>
                            <span
                                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                    user?.isActive
                                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                }`}
                            >
                                {user?.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Update Cards Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Update Name */}
                    <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6'>
                        <h2 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-4'>
                            Update Name
                        </h2>
                        <div className='flex gap-3'>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5
                                text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
                                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                                focus:border-transparent transition-all'
                                placeholder='Enter your name'
                            />
                            <button
                                onClick={() => handleUpdate('name')}
                                disabled={isUpdating}
                                className='px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
                                text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200
                                disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Update Phone */}
                    <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6'>
                        <h2 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-4'>
                            Update Phone
                        </h2>
                        <div className='flex gap-3'>
                            <input
                                type='text'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className='flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5
                                text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
                                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                                focus:border-transparent transition-all'
                                placeholder='Enter phone number'
                            />
                            <button
                                onClick={() => handleUpdate('phone')}
                                disabled={isUpdating}
                                className='px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
                                text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200
                                disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>

                {/* Change Password - Full Width */}
                <div className='mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6'>
                    <h2 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-4'>
                        Change Password
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {/* Old Password */}
                        <div className='relative'>
                            <input
                                type={showOld ? 'text' : 'password'}
                                placeholder='Old Password'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className='w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 pr-10
                                text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
                                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                                focus:border-transparent transition-all'
                            />
                            <button
                                type='button'
                                onClick={() => setShowOld(!showOld)}
                                className='absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            >
                                {showOld ? (
                                    <FaEyeSlash size={16} />
                                ) : (
                                    <FaEye size={16} />
                                )}
                            </button>
                        </div>

                        {/* New Password */}
                        <div className='relative'>
                            <input
                                type={showNew ? 'text' : 'password'}
                                placeholder='New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 pr-10
                                text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
                                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                                focus:border-transparent transition-all'
                            />
                            <button
                                type='button'
                                onClick={() => setShowNew(!showNew)}
                                className='absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            >
                                {showNew ? (
                                    <FaEyeSlash size={16} />
                                ) : (
                                    <FaEye size={16} />
                                )}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className='relative'>
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                placeholder='Confirm New Password'
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className='w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 pr-10
                                text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
                                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                                focus:border-transparent transition-all'
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirm(!showConfirm)}
                                className='absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            >
                                {showConfirm ? (
                                    <FaEyeSlash size={16} />
                                ) : (
                                    <FaEye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => handleUpdate('password')}
                        disabled={isUpdating}
                        className='mt-4 px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
                        text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200
                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MePage;
