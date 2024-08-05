import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUploadModalOpen: false,
  isAddGroupModalOpen: false,
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    openUploadModal(state) {
      state.isUploadModalOpen = true;
    },
    closeUploadModal(state) {
      state.isUploadModalOpen = false;
    },
    /////
    openAddGroupModal(state) {
      state.isAddGroupModalOpen = true;
    },
    closeAddGroupModal(state) {
      state.isAddGroupModalOpen = false;
    },
  },
});

export const { 
  openUploadModal, 
  closeUploadModal,
  
  openAddGroupModal,
  closeAddGroupModal,

} = UISlice.actions;

export default UISlice.reducer;
