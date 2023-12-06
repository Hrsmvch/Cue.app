import { useState } from "react"
import { useDispatch } from "react-redux";
import { useUpdateCategoryMutation } from "../services/NoteCategoriesSlice"; 
import { modalClose } from "services/modalSlice";

export const useUpdateCategory = () => {
  const dispatch = useDispatch();

  const [updateCategory] = useUpdateCategoryMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
 

  const update = async (id, values) => {  
    setIsSuccess(false)
    setIsLoading(true)
    setError(null)
 
    const response = await updateCategory({id, values}); 

    if ('data' in response) { 
      setIsLoading(false)
      setError(null) 
      setIsSuccess(true)
      dispatch(modalClose()); 
    } else {
      setIsLoading(false)
      setError(response?.error?.data?.message) 
    }
  }

  return { update, isLoading, error, isSuccess }
}