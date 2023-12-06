import { useState } from "react"
import { useDispatch } from "react-redux";
import { useUpdateEventMutation } from "../services/eventsSlice"; 
import { modalClose } from "services/modalSlice";

export const useUpdateEvent = () => {
  const dispatch = useDispatch(); 

  const [updateEvent] = useUpdateEventMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const update = async (id, values) => { 
    setIsLoading(true)
    setError(null)
 
    const response = await updateEvent({id, values}); 

    if ('data' in response) {
      setIsLoading(false)
      setError(null) 
      dispatch(modalClose()); 
    } else {
      setIsLoading(false)
      setError(response?.error?.data?.message) 
    }
  }

  return { update, isLoading, error }
}