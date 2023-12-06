import { apiSlice } from "services/apiSlice"

export const notesCategoriesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getAllCategories: builder.query({
      query: () => ({ url: '/notes-categories' }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_ALL_NOTES_CATEGORIES'],
    }),

    getCategoryById: builder.query({
      query: (id) => ({ url: `/notes-categories/${id}` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_NOTES_CATEGORY'],
    }),

    createNoteCategory: builder.mutation({
      query(data) {
        return {
          url: '/notes-categories',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['GET_ALL_NOTES_CATEGORIES'],
    }),

    updateCategory: builder.mutation({
      query(data) { 
        return {
          url: `/notes-categories/${data.id}`,
          method: 'PUT',
          body: data.values
        }
      },
      invalidatesTags: ['GET_ALL_NOTES_CATEGORIES'],
    }),

    removeCategory: builder.mutation({
      query(id) {
        return {
          url: `/notes-categories/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['GET_ALL_NOTES_CATEGORIES'],
    })

  })
})

export const { useCreateNoteCategoryMutation, useUpdateCategoryMutation, useRemoveCategoryMutation } = notesCategoriesApi;
