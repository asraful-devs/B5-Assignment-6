import { baseApi } from '../../baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                data: userInfo,
            }),
            invalidatesTags: ['USER'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['USER'],
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/user/register',
                method: 'POST',
                data: userInfo,
            }),
        }),

        userInfo: builder.query({
            query: () => ({
                url: '/user/me',
                method: 'GET',
            }),
            providesTags: ['USER'],
        }),

        // userInfo: builder.query({
        //     query: () => {
        //         const token = localStorage.getItem('accessToken');
        //         return {
        //             url: '/user/me',
        //             method: 'GET',
        //             headers: {
        //                 Authorization: token ? `${token}` : '',
        //             },
        //         };
        //     },
        //     providesTags: ['USER'],
        // }),

        getUserById: builder.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET',
            }),
            providesTags: ['USER'],
        }),

        updateUser: builder.mutation({
            query: (user) => ({
                url: `/user/${user.id}`,
                method: 'PATCH',
                data: user,
            }),
            invalidatesTags: ['USER'],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['USER'],
        }),

        getAllUsers: builder.query({
            query: () => ({
                url: '/user/all-users',
                method: 'GET',
            }),
            providesTags: ['USER'],
        }),

        getAllRiders: builder.query({
            query: () => ({
                url: '/user/all-riders',
                method: 'GET',
            }),
            providesTags: ['USER'],
        }),

        getAllDrivers: builder.query({
            query: () => ({
                url: '/user/all-drivers',
                method: 'GET',
            }),
            providesTags: ['USER'],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useUserInfoQuery,
    useGetUserByIdQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetAllUsersQuery,
    useGetAllRidersQuery,
    useGetAllDriversQuery,
} = authApi;
