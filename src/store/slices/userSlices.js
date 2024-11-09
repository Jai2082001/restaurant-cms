// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_FETCH_LINK}/api/user/login`, { email, password }, { withCredentials: true });
      console.log(response)
      return response.data; // Expect user data only, token stored as HttpOnly cookie
    } catch (error) {
      console.log(error)
      return rejectWithValue("Invalid Credentials");
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_FETCH_LINK}/api/user/register`, { email, password });
      return response.data; // Expect success response
    } catch (error) {
      return rejectWithValue("Cannot register user");
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_FETCH_LINK}/api/user/check-auth`, { withCredentials: true });
      return response.data; // Expect user data if authenticated
    } catch (error) {
      return rejectWithValue('Not authenticated');
    }
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to login';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to register';
      }) .addCase(checkAuthStatus.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set based on successful check
        state.user = action.payload.user; // Get user data from response
        state.status = 'succeeded';
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isAuthenticated = false; // Set false if not authenticated
        state.user = null; // Clear user data
        state.status = 'failed';
        state.error = 'Not authenticated'; // Clear the error message
      });

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
