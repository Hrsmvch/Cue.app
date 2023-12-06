import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
      baseUrl: 'http://localhost:3500', 
      prepareHeaders: (headers, { getState }) => {
        const { userToken } = (getState()).user;  
        if (userToken) headers.set('authorization', `Bearer ${userToken}`);
        
        return headers;
      },
    }),
    tagTypes: ['Notes', 'User', 'GET_ME'],
    // eslint-disable-next-line no-unused-vars
    endpoints: builder => ({})
})

 