import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  open: false,
  modalType: '', 
  modalData: '', 
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.open = true;
      state.modalType = action.payload.modalType; 
      state.modalData = action.payload.modalData; 
    },
    modalClose: (state) => {
      state.open = false;
      state.modalType = ''; 
      state.modalData = ''; 
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;

export const checkModalOpen = (state) => state.modal.open;
export const checkModalType = (state) => state.modal.modalType; 
export const checkModalData = (state) => state.modal.modalData; 


export default modalSlice.reducer;
