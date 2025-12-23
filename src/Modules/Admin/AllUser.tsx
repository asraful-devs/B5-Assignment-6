import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { toast } from 'sonner';
import {
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useUpdateUserMutation,
} from '../../Redux/Features/Auth/auth.api';
import NavigateHome from '../../Utils/NavigateHome';
import AllUserDetailsCard from './AllUserDetailsCard';

const AllUser = () => {
    const { data, isLoading } = useGetAllUsersQuery(undefined);
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    // console.log(data?.data);

    const users = data?.data || [];

    const driverRole = users.filter(
        (user: { role: string }) => user.role === 'DRIVER'
    ).length;
    const riderRole = users.filter(
        (user: { role: string }) => user.role === 'RIDER'
    ).length;

    // Pie chart data
    const pieData = [
        { name: 'Drivers', value: driverRole, color: '#4CAF50' }, // Green
        { name: 'Riders', value: riderRole, color: '#2196F3' }, // Blue
    ];

    // Role update function
    const handleUpdateRole = async (id: string, role: 'RIDER' | 'DRIVER') => {
        try {
            const res = await updateUser({ id, role }).unwrap();
            if (res.success) {
                toast.success('User role updated successfully');
            }
        } catch (error) {
            console.error('Failed to update role', error);
            toast.error('Failed to update role');
        }
    };

    // Delete function
    const handleDeleteUser = async (id: string) => {
        try {
            const res = await deleteUser(id).unwrap();
            if (res.success) {
                toast.success('User deleted successfully');
            }
        } catch (error) {
            console.error('Failed to delete user', error);
            toast.error('Failed to delete user');
        }
    };

    if (isLoading) return <p className='text-center py-10'>Loading users...</p>;

    return (
        <div>
            <div className=''>
                <NavigateHome />
            </div>
            {data?.data ? (
                <AllUserDetailsCard
                    users={data.data}
                    onUpdateRole={handleUpdateRole}
                    onDeleteUser={handleDeleteUser}
                />
            ) : (
                <p>No users found.</p>
            )}

            {/* Pie Chart Section */}
            <div className='mt-10 flex justify-center'>
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieData}
                        dataKey='value'
                        cx='50%'
                        cy='50%'
                        outerRadius={120}
                        label={(entry) => `${entry.name} (${entry.value})`}
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign='bottom' height={36} />
                </PieChart>
            </div>
        </div>
    );
};

export default AllUser;
