import { type ComponentType } from 'react';
import { Navigate } from 'react-router';
import { useUserInfoQuery } from '../Redux/Features/Auth/auth.api';
import type { TRole } from '../Types/Index';

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined);

        if (isLoading) {
            return <div>Loading...</div>;
        }

        // console.log({ requiredRole, userRole: data?.data?.data?.role });

        if (!isLoading && !data?.data?.data?.email) {
            return <Navigate to='/login' />;
        }

        if (
            requiredRole &&
            !isLoading &&
            requiredRole !== data?.data?.data?.role
        ) {
            return <Navigate to='/unauthorized' />;
        }

        return <Component />;
    };
};
