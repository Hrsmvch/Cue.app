import { useState } from "react"
import { useDispatch } from "react-redux";
import { setUserInfo, setUserToken, useLoginMutation } from "../services/loginSlice";
import { useNavigate } from "react-router-dom";
import { modalClose } from "services/modalSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signIn = async (values) => { 
    setIsLoading(true)
    setError(null)
 
    const response = await login(values); 

    if ('data' in response) {  
      setIsLoading(false)
      setError(null)
      const { accessToken, ...userInfo } = response.data  
 
      localStorage.setItem('userToken', accessToken)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      dispatch(setUserToken({ userToken: accessToken}))
      dispatch(setUserInfo({ userInfo: userInfo}))

      dispatch(modalClose());
      navigate('/');
    } else {
      setIsLoading(false)
      setError(response?.error?.data?.message) 
    }
  }

  return { signIn, isLoading, error }
}