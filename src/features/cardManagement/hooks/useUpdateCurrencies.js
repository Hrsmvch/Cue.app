import { useState } from "react"
import { useDispatch } from "react-redux"; 
import { modalClose } from "services/modalSlice";
import { balanceApi, useUpdateBalanceMutation } from "../service/balanceSlice";

export const useUpdateCurrencies = () => {
  const dispatch = useDispatch(); 

  const { data : balance } = balanceApi.useGetBalanceQuery();
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
 
  const [updateBalance] = useUpdateBalanceMutation();

  const update = async (values) => { 
    setIsLoading(true)
    setError(null)

    const balanceCurrencies = balance?.data?.currencies;
    const updated = {currenciesToAdd: [], currenciesToRemove: []}
  
      // Add new currencies
      const newCurrencies = values.filter((currency) => !balanceCurrencies?.some(b => b.currency == currency.value));  
      for (const currency of newCurrencies) { 
        await updated.currenciesToAdd.push({
          currency: currency.value,
          symbol: currency.symbol,
          amount: 0
        }); 
      } 
      // Remove currencies
      for (const currency of balanceCurrencies) {
        const selectedCurrency = values.find((c) => c.value === currency.currency);
        if (!selectedCurrency) {
          await updated.currenciesToRemove.push(currency.currency);
        }
      }
 
      const response = await updateBalance(updated); 

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