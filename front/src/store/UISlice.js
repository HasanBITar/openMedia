import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUploadModalOpen: false,
  isAddGroupModalOpen: false,
  isAddUserToGroupModal: false,
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

    ////
    openAddUserToGroupModal(state) {
      state.isAddUserToGroupModal = true;
      console.log('opennnnn')
    },
    closeAddUserToGroupModal(state) {
      state.isAddUserToGroupModal = false;
    }
  },
});

export const { 
  openUploadModal, 
  closeUploadModal,
  
  openAddGroupModal,
  closeAddGroupModal,

  openAddUserToGroupModal,
  closeAddUserToGroupModal,

} = UISlice.actions;

export default UISlice.reducer;
