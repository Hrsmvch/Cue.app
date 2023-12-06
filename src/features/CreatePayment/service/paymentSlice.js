import { apiSlice } from "services/apiSlice"

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: builder => ({ 
    getPaymentCats: builder.query({ 
      query: () => ({ url: `/expenses_categories` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_PAYMENT_CATEGORIES'],
    }), 
    createPayment: builder.mutation({
      query(data) {
        return {
          url: '/expenses',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['GET_MONTH_EXPENSES', 'GET_LAST_PAYMENT', 'GET_LAST_WEEK_PAYMENTS', 'GET_CURRENT_BALANCE', 'GET_TOTAL_BALANCE'],
    }),
  })
})


export const { useGetPaymentCatsQuery, useCreatePaymentMutation } = paymentApi