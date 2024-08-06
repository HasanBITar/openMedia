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
                url: `${API.getPermissions}`,
                method: 'GET',
            }),
        }),
        

        addPermissions: builder.mutation({
            query: ({ fileTag, userGroup }) => ({
                url: `${API.addPermissions}`,
                method: 'POST',
                body: { fileTag, userGroup },
            }),
        }),

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
    useGetPermissionsQuery,   
    useAddPermissionsMutation,

} = permissionAPI;