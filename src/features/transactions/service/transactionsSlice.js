import { apiSlice } from "services/apiSlice"

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLastPayment: builder.query({ 
      query: () => ({ url: `/expenses/last` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_LAST_PAYMENT'],
    }), 
    removePayment: builder.mutation({
      query(id) {
        return {
          url: `/expenses/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['GET_MONTH_EXPENSES', 'GET_LAST_PAYMENT', 'GET_LAST_WEEK_PAYMENTS', 'GET_CURRENT_BALANCE', 'GET_TOTAL_BALANCE'],
    }), 
  })
})


export const { useGetLastPaymentQuery, useRemovePaymentMutation } = transactionsApi