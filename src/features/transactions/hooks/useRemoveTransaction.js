import { modalClose } from "services/modalSlice"; 
import { useDispatch } from "react-redux";
import { useRemovePaymentMutation } from "../service/transactionsSlice";

export const useRemoveTransaction = () => { 
  const dispatch = useDispatch(); 
  const [removePayment] = useRemovePaymentMutation(); 
  
  const remove = async (id) => {   
    const response = await removePayment(id); 
    if ('data' in response) { 
      dispatch(modalClose()); 
    }  
  }

  return { remove }
}