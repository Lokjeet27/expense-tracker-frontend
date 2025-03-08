import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/authApi';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  token: string;
}

// interface AuthState {
//   user: User | null;
//   loading: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   loading: false
// };

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

// Async action for login
export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
