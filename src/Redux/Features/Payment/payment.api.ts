import { baseApi } from '../../baseApi';

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ✅ একটি ride এর payment details fetch করা
        // ✅ GET /api/payment/:rideId
        getPaymentByRide: builder.query({
            query: (rideId: string) => ({
                url: `/payment/${rideId}`,
                method: 'GET',
            }),
        }),

        // ✅ সকল rides এর সাথে payment details fetch করা
        // ✅ GET /api/payment/my-payments
        getMyPayments: builder.query({
            query: () => ({
                url: '/payment/my-payments',
                method: 'GET',
            }),
        }),

        // ✅ Payment initiate করা - SSLCommerz gateway open করতে
        // ✅ POST /api/payment/init/:rideId
        initPayment: builder.mutation({
            query: (rideId: string) => ({
                url: `/payment/init/${rideId}`,
                method: 'POST',
            }),
        }),

        // ✅ Payment history fetch করা - সব paid/failed payments
        // ✅ GET /api/payment/history
        getPaymentHistory: builder.query({
            query: () => ({
                url: '/payment/history',
                method: 'GET',
            }),
        }),

        confirmPayment: builder.mutation({
            query: (rideId: string) => ({
                url: `/payment/confirm/${rideId}`,
                method: 'POST',
            }),
            invalidatesTags: ['RIDE'],
        }),

        refetchRideData: builder.mutation({
            query: () => ({
                url: '/ride/my-rides',
                method: 'GET',
            }),
            invalidatesTags: ['RIDE'],
        }),

        // ✅ Admin - সকল payments fetch করা
        // ✅ GET /api/payment/admin/all-payments
        getAllPayments: builder.query({
            query: () => ({
                url: '/payment/admin/all-payments',
                method: 'GET',
            }),
        }),

        // ✅ Admin - Specific user এর payments fetch করা
        // ✅ GET /api/payment/admin/user/:userId
        getUserPayments: builder.query({
            query: (userId: string) => ({
                url: `/payment/admin/user/${userId}`,
                method: 'GET',
            }),
            providesTags: ['USER'],
        }),
    }),
});

export const {
    useGetPaymentByRideQuery,
    useGetMyPaymentsQuery,
    useInitPaymentMutation,
    useGetPaymentHistoryQuery,
    useConfirmPaymentMutation,
    useRefetchRideDataMutation,
    useGetAllPaymentsQuery,
    useGetUserPaymentsQuery,
} = paymentApi;
