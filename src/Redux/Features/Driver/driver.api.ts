import { baseApi } from '../../baseApi';

export const driverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createDrive: builder.mutation({
            query: ({ rideInfo, rideId }) => ({
                url: `/driver/pick-up-ride/${rideId}`,
                method: 'PATCH',
                data: rideInfo,
            }),
            invalidatesTags: ['DRIVER'],
        }),

        updateDrive: builder.mutation({
            query: ({ id, status }) => ({
                url: `/driver/update-ride-status/${id}`,
                method: 'PATCH',
                data: { status },
            }),
            invalidatesTags: ['DRIVER'],
        }),

        getAvailableRide: builder.query({
            query: () => ({
                url: '/driver/available-rides',
                method: 'GET',
            }),
            providesTags: ['DRIVER'],
        }),

        getDailyEarnings: builder.query({
            query: () => ({
                url: '/driver/daily-earnings',
                method: 'GET',
            }),
            providesTags: ['DRIVER'],
        }),

        getMyPick: builder.query({
            query: () => ({
                url: '/driver/my-rides',
                method: 'GET',
            }),
            providesTags: ['DRIVER'],
        }),
    }),
});

export const {
    useCreateDriveMutation,
    // useRemoveRideMutation,
    useUpdateDriveMutation,
    useGetAvailableRideQuery,
    useGetMyPickQuery,
    useGetDailyEarningsQuery,
} = driverApi;
