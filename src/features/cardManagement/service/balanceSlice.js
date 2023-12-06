import { apiSlice } from "services/apiSlice"

export const balanceApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBalance: builder.query({ 
      query: () => ({ url: `/balance` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_TOTAL_BALANCE'],
    }),
    updateBalance: builder.mutation({
      query(data) {
        return {
          url: '/balance/update',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['GET_TOTAL_BALANCE'],
    }), 
    updateMajorCurrency: builder.mutation({
      query(data) {
        return {
          url: '/balance/major-currency',
          method: 'PUT',
          body: data
        }
      },
      invalidatesTags: ['GET_TOTAL_BALANCE'],
    })

  })
})

export const { 
  useGetCurrentBalanceQuery,
  useGetBalanceQuery,
  useUpdateBalanceMutation,
  useUpdateMajorCurrencyMutation
  } = balanceApi;
