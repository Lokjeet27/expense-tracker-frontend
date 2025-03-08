import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/authApi';

interface User {
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false
};

// Async Thunks
export const userLogin = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  return await login(email, password);
});

export const userRegister = createAsyncThunk('auth/register', async (user: { name: string; email: string; password: string }) => {
  return await register(user);
});

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
