import { configureStore } from "@reduxjs/toolkit"; 
import { apiSlice } from "services/apiSlice";
import modalReducer from "services/modalSlice";   
import authReducer from "features/authentication/services/loginSlice";   

export const store = configureStore({
  reducer: {
    user: authReducer,
    modal: modalReducer, 
    [apiSlice.reducerPath]: apiSlice.reducer,  
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

