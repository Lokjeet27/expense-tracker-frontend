import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../api/authApi';
import axios from 'axios';


interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}



const initialState: AuthState = {
  token: localStorage.getItem("token") || null, // Load token from localStorage on app start
  isAuthenticated: !!localStorage.getItem("token"), // Set authentication state
};

// Async action for login
export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://expense-tracker-backend-1e0i.onrender.com/api/auth/login", credentials);
      return response.data.token; // Returning token
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userRegister = createAsyncThunk('auth/register', async (user: { name: string; email: string; password: string }) => {
  return await register(user);
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
