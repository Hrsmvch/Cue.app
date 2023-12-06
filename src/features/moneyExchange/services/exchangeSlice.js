import { apiSlice } from "services/apiSlice"

export const exchangeApi = apiSlice.injectEndpoints({
  endpoints: builder => ({ 
    exchangeMoney: builder.mutation({
      query(data) {
        return {
          url: '/exchanges',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['GET_CURRENT_BALANCE', 'GET_TOTAL_BALANCE'],
    })
  })
})

export const { useExchangeMoneyMutation } = exchangeApi;