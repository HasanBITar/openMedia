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
    getUsersOfGroup: builder.query({
      query: (groupId) => ({
        url: `${API.getUsersOfGroup}${groupId}`,
        method: 'GET',
      }),
    }),
    deleteUserFromGroup: builder.mutation({
      query: ({groupId, userId}) => ({
        url: `${API.deleteUserFromGroup}${groupId}${userId}`,
        method: 'DELETE',
      }),
    }),
    addUserToGroup: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `${API.addUserToGroup}${groupId}`,
        method: 'POST',
        body: { userId },
      }),
    }),
    deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `${API.deleteGroup}${groupId}`,
        method: 'DELETE',
      }),
    }),
    addGroup: builder.mutation({
      query: (newGroup) => ({
        url: `${API.addGroup}`,
        method: 'POST',
        body: newGroup,
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetUsersOfGroupQuery,
  useDeleteUserFromGroupMutation,
  useAddUserToGroupMutation,
  useDeleteGroupMutation,
  useAddGroupMutation,
} = groupsAPI;
