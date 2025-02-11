"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
const isBrowser = typeof window !== "undefined";

const getStoredUser = isBrowser ? localStorage.getItem("user") : null;
const storedUser: string | null = getStoredUser || null;
const storedToken = isBrowser ? localStorage.getItem("authToken") : null;
const parseData = storedUser ? JSON.parse(storedUser) : null;


const initialState: AuthState = {
  user: parseData
    ? { id: parseData._id, name: parseData.name, email: parseData.email }
    : null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

interface UserLoginResponse {
  _id: string;
  name: string | null;
  email: string;
  phone_number: string | null;
  role: string;
  profile_picture: string | null;
  country: number | null;
  state: number | null;
  city: number | null;
  status: string;
  date_of_birth: number | null;
  isVerified: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  output: number;
  message: string;
  jsonResponse: UserLoginResponse;
  token: string;
}

interface ApiError {
  message: string;
}

// Asynchronous actions
export const signup = createAsyncThunk<
  LoginResponse,
  { name: string; email: string; password: string },
  { rejectValue: ApiError }
>("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiUrl) {
      throw new Error("Backend API URL is not defined");
    }
    const response = await axios.post(`${apiUrl}/user/signup`, data);
    const { jsonResponse, token } = response.data as LoginResponse;

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(jsonResponse));

    return response.data;
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedError = error as any;
    return rejectWithValue({
      message: typedError.response?.data?.message || "Signup failed",
    });
  }
});

export const login = createAsyncThunk<
  UserLoginResponse,
  { email: string; password: string },
  { rejectValue: ApiError }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiUrl) {
      throw new Error("Backend API URL is not defined");
    }

    const response = await axios.post(`${apiUrl}/user/login`, data);
    const { jsonResponse, token } = response.data as LoginResponse;

    // Store token in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(jsonResponse));

    return jsonResponse;
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedError = error as any;
    return rejectWithValue({
      message: typedError.response?.data?.message || "Signup failed",
    });
  }
});

export const logout = createAsyncThunk<null, void, { rejectValue: ApiError }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      return null;
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const typedError = error as any;
      return rejectWithValue({
        message: typedError.response?.data?.message || "Signup failed",
      });
    }
  }
);

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          console.log(action.payload);

          state.loading = false;
          state.user = {
            id: action.payload.jsonResponse._id,
            name: action.payload.jsonResponse.name || "",
            email: action.payload.jsonResponse.email,
          };
          state.isAuthenticated = true;
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Unknown error occurred";
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserLoginResponse>) => {
          state.loading = false;
          state.user = {
            id: action.payload._id,
            name: action.payload.name || "",
            email: action.payload.email,
          };
          state.isAuthenticated = true;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Unknown error occurred";
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Unknown error occurred";
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;