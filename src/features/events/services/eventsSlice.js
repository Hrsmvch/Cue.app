import { apiSlice } from "services/apiSlice"

export const eventsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getAllEvents: builder.query({
      query: (params) => ({ url: `/events?startDate=${params.startDate}&endDate=${params.endDate}` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_ALL_EVENTS'],
    }),

    getUpcomingEvents: builder.query({
      query: () => ({ url: `/events/upcoming` }),
      transformResponse: (data) => data,
      providesTags: () => ['GET_UPCOMING_EVENTS'], 
    }),

    getEventById: builder.query({
      query: (id) => ({ url: `/events/${id}` }),
      transformResponse: (data) => data, 
    }),

    createEvent: builder.mutation({
      query(data) {
        return {
          url: '/events',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['GET_ALL_EVENTS', 'GET_UPCOMING_EVENTS'],
    }),

    updateEvent: builder.mutation({
      query(data) {
        return {
          url: `/events/${data.id}`,
          method: 'PUT',
          body: data.values
        }
      },
      invalidatesTags: ['GET_ALL_EVENTS', 'GET_UPCOMING_EVENTS'],
    }),
    
    removeEvent: builder.mutation({
      query(data) {
        const { id, current } = data;
        return {
          url: `/events/${id}${current ? `?current=${current}` : ''}`,
          method: 'DELETE',  
        }
      },
      invalidatesTags: ['GET_ALL_EVENTS', 'GET_UPCOMING_EVENTS'],
    }),

  })
})

export const { useCreateEventMutation, useGetEventByIdQuery, useRemoveEventMutation, useUpdateEventMutation } = eventsApi;
