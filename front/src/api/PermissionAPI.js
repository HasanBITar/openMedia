import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../config';
import baseQuery from './index';


export const permissionAPI = createApi({
    reducerPath: 'permissionAPI',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getFiles: builder.query({
            query: () => ({
                url: `${API.getMyFiles}`,
                method: 'GET',
            }),
        }),

        getUsers: builder.query({
            query: () => ({
                url: `${API.getAllUsers}`,
                method: 'GET',
            }),
        }),

        getPermissions: builder.query({
            query: () => ({
                url: `${API.getMyFiles}`,
                method: 'GET',
            }),
        }),
        

        // addTag: builder.mutation({
        //     query: ({ name, color }) => ({
        //         url: `${API.addTag}`,
        //         method: 'POST',
        //         body: { name, color },
        //     }),
        // }),

        // deleteTag: builder.mutation({
        //     query: (tagId) => ({
        //         url: `${API.deleteTag}${tagId}`,
        //         method: 'DELETE',
        //     }),
        // }),
    })
})


export const {
    useGetFilesQuery,
    useGetUsersQuery,    

} = permissionAPI;