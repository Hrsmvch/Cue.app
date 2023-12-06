import { useState } from "react"
import { useDispatch } from "react-redux";
import { useCreateEventMutation } from "../services/eventsSlice"; 
import { modalClose } from "services/modalSlice";

export const useCreateEvent = () => {
  const dispatch = useDispatch(); 

  const [createEvent] = useCreateEventMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const create = async (values) => { 
    setIsLoading(true)
    setError(null)
 
    const response = await createEvent(values); 

    if ('data' in response) {
      setIsLoading(false)
      setError(null) 
      dispatch(modalClose()); 
    } else {
      setIsLoading(false)
      setError(response?.error?.data?.message) 
    }
  }

  return { create, isLoading, error }
}