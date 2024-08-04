import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUploadModalOpen: false,
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
  },
});

export const { openUploadModal, closeUploadModal } = UISlice.actions;
export default UISlice.reducer;
