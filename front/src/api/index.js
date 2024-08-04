import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../config'

const baseQuery = fetchBaseQuery({
    baseUrl: BACKEND_API,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user?.token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});


export default baseQuery;