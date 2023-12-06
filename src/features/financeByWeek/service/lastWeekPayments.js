import { apiSlice } from "services/apiSlice"

export const lastWeekPaymentsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLastWeekPayments: builder.query({ 
      query: () => ({ url: `/expenses/last-week` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_LAST_WEEK_PAYMENTS'],
    }),
  })
})

export const { 
  useGetLastWeekPaymentsQuery
  } = lastWeekPaymentsApi;
