
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_API, API } from '../config';

export const AUTH_STATUS = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed'
}

const setToken = (token) => {
  localStorage.setItem('authToken', token);
}

export const getToken = () => {
  return localStorage.getItem('authToken');
}

const apiClient = axios.create({ baseURL: BACKEND_API });

export const login = createAsyncThunk(API.signin, async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(API.signin, credentials);
    return response.data;
  } catch (err) {
    console.error(err);
    let message = 'Internal server error';
    if (err.response && err.response.status === 401) {
      message = err.response.data.message || 'Invalid email or password';
    }
    return rejectWithValue(message);
  }
});

export const signup = createAsyncThunk(API.signup, async (user, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(API.signup, user);
    return response.data;
  }
  catch (err) {
    console.error(err);
    let message = 'Internal server error';
    if (err.response && err.response.status === 401) {
      message = err.response.data.message || 'Invalid email or password';
    }
    return rejectWithValue(message);
  }
})

export const verifyToken = createAsyncThunk(API.verifyToken, async () => {
  const token = getToken()
  if (!token) {
    throw new Error('No token found');
  }

  const response = await apiClient.get(API.verifyToken, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
});


const initialState = {
  user: null,
  status: AUTH_STATUS.loading,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(login.pending, (state) => {
        state.status = AUTH_STATUS.loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = AUTH_STATUS.succeeded;
        state.user = action.payload;
        setToken(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = AUTH_STATUS.failed;
        state.error = action.payload || action.error.message;
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.status = AUTH_STATUS.loading;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = AUTH_STATUS.succeeded;
        state.user = action.payload;
        setToken(action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = AUTH_STATUS.failed;
        state.error = action.payload || action.error.message;
      })
      // Verify
      .addCase(verifyToken.pending, (state) => {
        state.status = AUTH_STATUS.loading;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.status = AUTH_STATUS.succeeded;
        state.user = action.payload;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.status = AUTH_STATUS.idle;
        state.user = null;
        state.error = null;
        localStorage.removeItem('authToken');
      });
  },
});

export default authSlice.reducer;
