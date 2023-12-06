import { useState } from "react" 
import { useUpdateUserMutation } from "services/usersSlice";
import { setUserInfo } from "../../authentication/services/loginSlice";
import { useDispatch, useSelector } from "react-redux";

export const useUpdateProfile = () => { 

  const dispatch = useDispatch(); 
  const [ updateUser ] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state?.user); 

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const updateProfile = async (values) => { 
    setIsLoading(true)
    setError(null)
 
    const updatedFields = await {};
 
    if (values.username !== userInfo.username) {
      updatedFields.username = values.username;
    }

    if (values.email !== userInfo.email) {
      updatedFields.email = values.email;
    }

    if (values.avatar !== userInfo.avatar) {
      updatedFields.avatar = values.avatar;
    }

    if (values.password) {
      updatedFields.password = values.password;
    }
   
    const response = await updateUser(updatedFields);
        
    if ('data' in response) {    
      setIsLoading(false)
      setError(null) 

      // eslint-disable-next-line no-unused-vars
      const { accessToken, password, ...profileInfo } = response.data    

      dispatch(setUserInfo({ userInfo: profileInfo})) 
      localStorage.setItem('userInfo', JSON.stringify(profileInfo)) 
  
    } else {
      setIsLoading(false)
      setError(response?.error?.data?.message) 
    }
  }

  return { updateProfile, isLoading, error }
}