import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = process.env.API_BASE_URL || "http://localhost:3003";

// Create a centralized axios instance with default configuration
const apiClient = axios.create({
  baseURL: apiEndpoint,
  timeout: 10000000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Async action to fetch user profile
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.get("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch profile");
  }
});

// Async action to update user profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (updateData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.put("/users/profile", updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to update profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfile cases
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      })
      // updateProfile cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
