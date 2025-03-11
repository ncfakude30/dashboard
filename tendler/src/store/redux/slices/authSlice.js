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

// Async action to handle login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
  try {
    const response = await apiClient.post("/auth/login", userData);
    localStorage.setItem("token", response.data.access_token); // Store token
    console.log(JSON.stringify(response));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async action to handle registration and then automatically log in the user
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
  try {
    // Call the register endpoint
    await apiClient.post("/users/register", {
      username: userData.email,
      password: userData.password,
      name: userData.name,
    });
    // After successful registration, dispatch loginUser using the same credentials
    const loginResult = await thunkAPI
      .dispatch(loginUser({ username: userData.email, password: userData.password }))
      .unwrap();
    return loginResult;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      // registerUser cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
