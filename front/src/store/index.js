// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import UISlice from './UISlice';
import { filesAPI } from '../api/filesAPI';

const store = configureStore({
  reducer: {
    auth: authReducer,
    UI: UISlice,
    [filesAPI.reducerPath]: filesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filesAPI.middleware), 
});

export default store;
