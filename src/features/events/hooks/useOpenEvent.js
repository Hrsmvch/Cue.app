import { useGetEventByIdQuery } from "../services/eventsSlice";

export const useOpenEvent = (id) => { 
  const {data : eventInfo, isLoading, error} = useGetEventByIdQuery(id); 

  return { eventInfo, isLoading, error }
}