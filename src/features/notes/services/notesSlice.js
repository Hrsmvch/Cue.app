import { apiSlice } from "services/apiSlice"

export const notesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllNotes: builder.query({ 
      query: (cat) => ({ url: `/notes${cat && `?cat=${cat}`}` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_ALL_NOTES'],
    }),
    getNoteById: builder.query({
      query: (id) => ({ url: `/notes/${id}` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_ONE_NOTES'], 
    }),
    getLastNote: builder.query({
      query: () => ({ url: `/notes/last` }),
      transformResponse: (data) => data, 
    }),
    createNote: builder.mutation({
      query(data) {
        return {
          url: '/notes',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['GET_ALL_NOTES', 'GET_ALL_NOTES_CATEGORIES'],
    }), 
    updateNote: builder.mutation({
      query(data) {
        return {
          url: `/notes/${data.id}`,
          method: 'PUT',
          body: data.values
        }
      },
      invalidatesTags: ['GET_ALL_NOTES', 'GET_ALL_NOTES_CATEGORIES', 'GET_ONE_NOTES'],
    }),
    removeNote: builder.mutation({
      query(id) {
        return {
          url: `/notes/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['GET_ALL_NOTES_CATEGORIES', 'GET_ALL_NOTES'],
    }),

  })
})

export const { 
    useGetAllNotesQuery, 
    useCreateNoteMutation, 
    useGetNoteByIdQuery, 
    useRemoveNoteMutation, 
    useUpdateNoteMutation,
    useGetLastNoteQuery } = notesApi;
