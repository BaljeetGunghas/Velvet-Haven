"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies"; // Import nookies for handling cookies

interface User {
  id: string;
  name: string;
  email: string;
  userRole: string;
  profile_picture: string | null;
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
const cookies = parseCookies();
const token = cookies.authToken; // Get token from cookies
const storedToken = isBrowser ? token : null;
const parseData = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user: parseData
    ? {
        id: parseData._id,
        name: parseData.name,
        email: parseData.email,
        userRole: parseData.role,
        profile_picture: parseData.profile_picture,
      }
    : null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

export interface UserLoginResponse {
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

    setCookie(null, "authToken", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "Strict",
    });
    setCookie(null, "userRole", jsonResponse.role, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "Strict",
    });
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

    localStorage.setItem("user", JSON.stringify(jsonResponse));

    setCookie(null, "authToken", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "Strict",
    });
    setCookie(null, "userRole", jsonResponse.role, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "Strict",
    });
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
      localStorage.removeItem("user");
      destroyCookie(null, "authToken");
      destroyCookie(null, "userRole");
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
         
          state.loading = false;
          state.user = {
            id: action.payload.jsonResponse._id,
            name: action.payload.jsonResponse.name || "",
            email: action.payload.jsonResponse.email,
            userRole: action.payload.jsonResponse.role,
            profile_picture: action.payload.jsonResponse.profile_picture,
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
            userRole: action.payload.role,
            profile_picture: action.payload.profile_picture,
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
