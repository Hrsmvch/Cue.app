import { modalClose } from "services/modalSlice";
import { useRemoveCategoryMutation } from "../services/NoteCategoriesSlice";
import { useDispatch } from "react-redux";

export const useRemoveCategory = () => { 
  const dispatch = useDispatch(); 
  const [removeCategory] = useRemoveCategoryMutation(); 
  
  const remove = async (id) => {   
    const response = await removeCategory(id); 
    if ('data' in response) { 
      dispatch(modalClose()); 
    }  
  }

  return { remove }
}