import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import UISlice from './UISlice';
import { filesAPI } from '../api/filesAPI';
import { groupsAPI } from '../api/groupsAPI';
import { tagsAPI } from '../api/TagsAPI';
import { permissionAPI } from '../api/PermissionAPI';

const store = configureStore({
  reducer: {
    auth: authReducer,
    UI: UISlice,
    
    [filesAPI.reducerPath]: filesAPI.reducer,
    [groupsAPI.reducerPath]: groupsAPI.reducer,
    [tagsAPI.reducerPath]: tagsAPI.reducer,
    [permissionAPI.reducerPath]: permissionAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      filesAPI.middleware, 
      groupsAPI.middleware, 
      tagsAPI.middleware,
      permissionAPI.middleware,
    ),
});

export default store;
