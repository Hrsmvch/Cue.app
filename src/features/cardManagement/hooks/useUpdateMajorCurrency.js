import { useState } from "react"
import { useDispatch } from "react-redux"; 
import { modalClose } from "services/modalSlice"; 
import { useUpdateMajorCurrencyMutation } from "../service/balanceSlice";

export const useUpdateMajorCurrency = () => {
  const dispatch = useDispatch();  
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
 
  const [updateMajorCurrency] = useUpdateMajorCurrencyMutation();

  const update = async (values) => { 
    setIsLoading(true)
    setError(null) 
  
    const response = await updateMajorCurrency(values); 

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