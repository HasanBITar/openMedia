import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../config';
import baseQuery from './index';

export const groupsAPI = createApi({
  reducerPath: 'groups',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => ({
        url: `${API.getGroups}`,
        method: 'GET',
      }),
    }),
    
    addGroup: builder.mutation({
      query: (newGroup) => ({
        url: `${API.addGroup}`,
        method: 'POST',
        body: newGroup,
      }),
    }),
    
    deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `${API.deleteGroup}${groupId}`,
        method: 'DELETE',
      }),
    }),

    ////// group info 
    getGroupInfo: builder.query({
      query: (groupId) => ({
        url: `${API.getGroupInfo}${groupId}`,
        method: 'GET',
      }),
    }),
    addUserToGroup: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `${API.addUserToGroup}${groupId}`,
        method: 'POST',
        body: { userId },
      }),
    }),
    deleteUserFromGroup: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `${API.deleteUserFromGroup}${groupId}${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useAddGroupMutation,
  useDeleteGroupMutation,
  
  useGetGroupInfoQuery,
  useDeleteUserFromGroupMutation,
  useAddUserToGroupMutation,
} = groupsAPI;
