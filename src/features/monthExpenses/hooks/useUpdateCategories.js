import { useState } from "react"
import { useDispatch } from "react-redux"; 
import { modalClose } from "services/modalSlice";
import { useUpdateCategoriesMutation } from "../service/expensesSlice";

export const useUpdateCategories = () => {
  const dispatch = useDispatch(); 

  const [updateCategories] = useUpdateCategoriesMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const update = async (values) => { 
    setIsLoading(true)
    setError(null)
 
    const response = await updateCategories(values); 

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