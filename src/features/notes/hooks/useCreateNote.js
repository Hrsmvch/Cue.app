import { useState } from "react"
import { useDispatch } from "react-redux";
import { useCreateNoteMutation } from "../services/notesSlice"; 
import { modalClose } from "services/modalSlice";

export const useCreateNote = () => {
  const dispatch = useDispatch(); 

  const [createNote] = useCreateNoteMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const create = async (values) => { 
    setIsLoading(true)
    setError(null)
 
    const response = await createNote(values); 

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