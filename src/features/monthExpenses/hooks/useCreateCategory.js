import { useState } from "react"
import { useDispatch } from "react-redux"; 
import { modalClose } from "services/modalSlice";
import { useCreateCategoryMutation } from "../service/expensesSlice";

export const useCreateCategory = () => {
  const dispatch = useDispatch(); 

  const [createCategory] = useCreateCategoryMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const create = async (values) => { 
    setIsLoading(true)
    setError(null)
 
    const response = await createCategory(values); 

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