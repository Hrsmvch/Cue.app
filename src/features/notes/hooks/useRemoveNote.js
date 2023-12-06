import { modalClose } from "services/modalSlice"; 
import { useRemoveNoteMutation } from "../services/notesSlice";
import { useDispatch } from "react-redux";

export const useRemoveNote = () => { 
  const dispatch = useDispatch(); 
  const [removeNote] = useRemoveNoteMutation(); 
  
  const remove = async (id) => {   
    const response = await removeNote(id); 
    if ('data' in response) { 
      dispatch(modalClose()); 
    }  
  }

  return { remove }
}