import { useState } from "react" 
import { useAddSalaryMutation } from "../services/salarySlice";

export const useAddSalary = () => { 

  const [addSalary] = useAddSalaryMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const addSalaryData = async (data) => { 
    setIsLoading(true)
    setError(null)
 
    const response = await addSalary(data);  

    if ('data' in response) {
      setIsLoading(false)
      setError(null)  
    } else {
      setIsLoading(false)
      setError(response?.error?.data?.message) 
    }
  }

  return { addSalaryData, isLoading, error }
}