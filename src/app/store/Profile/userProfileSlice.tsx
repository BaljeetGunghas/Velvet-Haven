"use client";

import { authHeader } from "@/app/Auth/AuthHeader/authHeader";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "nookies";

export interface UserProfileData {
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
interface UserProfileState {
  userDetails: UserProfileData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  userDetails: null,
  loading: false,
  error: null,
};

export interface UserProfileResponse {
  output: number;
  message: string;
  jsonResponse: UserProfileData;
  token: string;
}

interface ApiError {
  message: string;
}
export const userProfile = createAsyncThunk<
  UserProfileResponse,
  { _id: string },
  { rejectValue: ApiError }
>("userProfile/getUserProfile", async (data, { rejectWithValue }) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiUrl) {
      throw new Error("Backend API URL is not defined");
    }

    const response = await axios.post(`${apiUrl}/user/getUserProfile`, data, {
      headers: authHeader(),
    });
    const responseData = response.data;
    setCookie(null, "userRole", responseData.jsonResponse.role, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "Strict",
    });
    return responseData as UserProfileResponse;
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedError = error as any;
    return rejectWithValue({
      message: typedError.response?.data?.message || "Unknown error occurred",
    });
  }
});

// Slice
export const userProifleSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userProfile.fulfilled,
        (state, action: PayloadAction<UserProfileResponse>) => {
          state.loading = false;
          state.userDetails = action.payload.jsonResponse;
          state.error = null;
        }
      )
      .addCase(
        userProfile.rejected,
        (state, action: PayloadAction<ApiError | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Unknown error occurred";
        }
      );
  },
});

export const { clearError } = userProifleSlice.actions;

export default userProifleSlice.reducer;
