import { modalClose } from "services/modalSlice";
import { useRemoveEventMutation } from "../services/eventsSlice";
import { useDispatch } from "react-redux";

export const useRemoveEvent = () => { 
  const dispatch = useDispatch(); 
  const [removeEvent] = useRemoveEventMutation(); 
  
  const remove = async (data, current) => {   
    const response = await removeEvent({id: data, current}); 
    if ('data' in response) { 
      dispatch(modalClose()); 
    }  
  }

  return { remove }
}