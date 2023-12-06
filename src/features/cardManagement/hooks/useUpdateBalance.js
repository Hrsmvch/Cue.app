import { useState } from "react"
import { useDispatch } from "react-redux"; 
import { modalClose } from "services/modalSlice";
import { useUpdateBalanceMutation } from "../service/balanceSlice";

export const useUpdateBalance = () => {
  const dispatch = useDispatch();  
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
 
  const [updateBalance] = useUpdateBalanceMutation();

  const updateBalanceData = async (values) => {  
    setIsLoading(true)
    setError(null) 
  
    const response = await updateBalance({currencyUpdates: values}); 

    if ('data' in response) {
      setIsLoading(false)
      setError(null) 
      dispatch(modalClose()); 
    } else {
      setIsLoading(false)
      setError(response?.error?.data?.message) 
    }
  }

  return { updateBalanceData, isLoading, error }
}