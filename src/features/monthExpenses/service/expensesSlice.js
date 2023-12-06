import { apiSlice } from "services/apiSlice"

export const expensesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMonthExpenses: builder.query({ 
      query: () => ({ url: `/expenses` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_MONTH_EXPENSES'],
    }), 
    getPaymentCats: builder.query({ 
      query: () => ({ url: `/expenses_categories` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_PAYMENT_CATEGORIES'],
    }),
    createCategory: builder.mutation({
      query(data) {
        return {
          url: '/expenses_categories',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['GET_PAYMENT_CATEGORIES', 'GET_MONTH_EXPENSES'],
    }),
    updateCategories: builder.mutation({
      query(data) {
        return {
          url: '/expenses_categories',
          method: 'PUT',
          body: data
        }
      },
      invalidatesTags: ['GET_PAYMENT_CATEGORIES', 'GET_MONTH_EXPENSES'],
    }),
    getYearExpensesByCat: builder.query({
      query: (data) => ({ url: `/expenses/${data.year}/${data.id}` }),
      transformResponse: (data) => data, 
    }),
     
  })
})


export const { 
  useGetMonthExpensesQuery, 
  useGetPaymentCatsQuery, 
  useUpdateCategoriesMutation, 
  useCreateCategoryMutation,
  useGetYearExpensesByCatQuery } = expensesApi