import { apiSlice } from "services/apiSlice"

export const currentBalanceApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCurrentBalance: builder.query({ 
      query: (month) => ({ url: `/balance/current${month ? `?month=${month}` : ''}` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_CURRENT_BALANCE'],
    })   
  })
})

export const { 
  useGetCurrentBalanceQuery
  } = currentBalanceApi;
