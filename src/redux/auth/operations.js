import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

const SetAuthHeaders = (token) => {
  if (!token) {
    console.warn("No token provided for SetAuthHeaders");
    return;
  }
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const logOut = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    await instance.post("/auth/logout");
    instance.defaults.headers.common["Authorization"] = "";
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "An error occurred during logout"
    );
  }
});

export const apiRegister = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/auth/register", formData);
      SetAuthHeaders(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "An error occurred during registration"
      );
    }
  }
);

export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/auth/login", formData);

      const token = data?.data?.accessToken;
      if (!token) {
        throw new Error("No token returned from API");
      }

      SetAuthHeaders(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "An error occurred during login"
      );
    }
  }
);

export const apiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      console.warn("No token found during refresh");
      return thunkAPI.rejectWithValue("No token provided");
    }

    try {
      const { data } = await instance.post("/auth/refresh", null, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });


      SetAuthHeaders(data.data.accessToken);
      return data;
    } catch (error) {
      console.error("Refresh error:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "An error occurred during refresh"
      );
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      return !!token;
    },
  }
);
