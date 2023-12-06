import { useState } from "react"  
import { useExchangeMoneyMutation } from "../services/exchangeSlice";

export const useExchangeMoney = () => { 

  const [exchangeMoney] = useExchangeMoneyMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const exchange = async (data) => { 
    setIsLoading(true)
    setError(null)
 
    const response = await exchangeMoney(data);

    if ('data' in response) {
      setIsLoading(false)
      setError(null)  
    } else {
      setIsLoading(false)
      setError(response?.error?.data?.message) 
    }
  }

  return { exchange, isLoading, error }
}