import { apiSlice } from './apiSlice'
 
export const usersApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation({
      query(data) {
        return {
          url: '/users',
          method: 'POST',
          body: data
        }
      },
      // invalidatesTags: ['GET_ALL_USERS']
    }),
    updateUser: builder.mutation({
      query(data) {
        return {
          url: '/users',
          method: 'PUT',
          body: data
        }
      },
      // invalidatesTags: ['GET_ALL_USERS']
    }),
    removeUser: builder.mutation({
      query(data) {
        return {
          url: '/users',
          method: 'DELETE',
          body: data
        }
      },
      // invalidatesTags: ['GET_ALL_USERS']
    }),
  })
})

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useRemoveUserMutation
} = usersApi;