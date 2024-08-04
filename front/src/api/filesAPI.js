import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, fileTypes } from '../config'
import baseQuery from './index';

export const filesAPI = createApi({
    reducerPath: 'files',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getFiles: builder.query({
            query: ({type, page}) => ({
                url: API.getFiles,
                method: 'GET',
                params: { type, page },
            }),
        }),
        addVideo: builder.mutation({
            query: (newVideo) => ({
                url: 'videos',
                method: 'POST',
                body: newVideo,
            }),
        }),
        updateVideo: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `videos/${id}`,
                method: 'PUT',
                body: patch,
            }),
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `videos/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetFilesQuery,
    useAddVideoMutation,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
} = filesAPI;
