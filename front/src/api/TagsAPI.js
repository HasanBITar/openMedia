import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../config';
import baseQuery from './index';


export const tagsAPI = createApi({
    reducerPath: 'tagsAPI',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getTags: builder.query({
            query: () => ({
                url: `${API.getTags}`,
                method: 'GET',
            }),
        }),

        addTag: builder.mutation({
            query: ({ name, color }) => ({
                url: `${API.addTag}`,
                method: 'POST',
                body: { name, color },
            }),
        }),

        deleteTag: builder.mutation({
            query: (tagId) => ({
                url: `${API.deleteTag}${tagId}`,
                method: 'DELETE',
            }),
        }),
    })
})


export const {
    useGetTagsQuery,
    useAddTagMutation,
    useDeleteTagMutation,

} = tagsAPI;