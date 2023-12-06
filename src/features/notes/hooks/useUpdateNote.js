import { useState } from "react"
import { useDispatch } from "react-redux";
import { modalClose } from "services/modalSlice";
import { useUpdateNoteMutation } from "../services/notesSlice";

export const useUpdateNote = () => {
  const dispatch = useDispatch(); 

  const [updateNote] = useUpdateNoteMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const update = async (id, values) => {  
    setIsLoading(true)
    setError(null)
 
    const response = await updateNote({id, values}); 

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