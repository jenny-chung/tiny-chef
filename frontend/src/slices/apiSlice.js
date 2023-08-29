// Create API service
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: ''
});

export const apiSlice = createApi({
    baseQuery,
    tagType: ['Recipe', 'User'],
    endpoints: (builder) => ({}),
});