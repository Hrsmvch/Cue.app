import { apiSlice } from "services/apiSlice"

export const salaryApi = apiSlice.injectEndpoints({
  endpoints: builder => ({ 
    addSalary: builder.mutation({
      query(data) {
        return {
          url: '/salary',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['GET_CURRENT_BALANCE', 'GET_TOTAL_BALANCE'],
    })
  })
})

export const { useAddSalaryMutation } = salaryApi