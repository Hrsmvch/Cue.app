import { useState } from "react"
import { useDispatch } from "react-redux";
import { useCreatePaymentMutation } from "../service/paymentSlice"; 
import { modalClose } from "services/modalSlice";

export const useCreatePayment = () => {
  const dispatch = useDispatch(); 

  const [createPayment] = useCreatePaymentMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const create = async (values) => { 
    setIsLoading(true)
    setError(null)
 
    const response = await createPayment(values); 

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