import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../config";

const initialState = {
  tags: [],
  activeTags: [],
  status: "idle",
  error: null,
};

const apiClient = axios.create({ baseURL: BACKEND_API });

export const fetchTags = createAsyncThunk(API.getTags, async () => {
  try {
    const response = await apiClient.get(API.getTags);
    return response.data;
  } catch (err) {
    throw Error("Failed to fetch tags");
  }
});

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addActiveTag: (state, action) => {
      state.activeTags.push(action.payload);
    },
    clearActiveTags: (state) => {
      state.activeTags = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addActiveTag, clearActiveTags } = tagSlice.actions;

export default tagSlice.reducer;
