import { baseApi } from '../../baseApi';

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (userInfo) => ({
                url: '/contact/create-contact',
                method: 'POST',
                data: userInfo,
            }),
        }),

        removeContact: builder.mutation({
            query: (contactId) => ({
                url: `/contact/delete-contact/${contactId}`,
                method: 'DELETE',
            }),
        }),

        getAllContact: builder.query({
            query: () => ({
                url: '/contact/all-contacts',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreateContactMutation,
    useRemoveContactMutation,
    useGetAllContactQuery,
} = contactApi;
