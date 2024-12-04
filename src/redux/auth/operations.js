import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const SetAuthHeaders = (token) => {
  if (!token) {
    console.warn("No token provided for SetAuthHeaders");
    return;
  }
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log("Authorization header set:", token);
};

export const logOut = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    await instance.post("/auth/logout");
    axios.defaults.headers.common["Authorization"] = "";
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data?.data.error);
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
        error.response.data?.data.error || "An error occurred"
      );
    }
  }
);

export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/auth/login", formData);
      console.log("Login response:", data);

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

export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await instance.post("/auth/logout");
      return {};
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    }
  }
);

export const apiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    console.log(token);
    
    if (!token) {
      console.warn("No token found during refresh");
      return thunkApi.rejectWithValue("No token provided");
    }

    try {
      SetAuthHeaders(token);
      const { data } = await instance.post("/auth/refresh", {accessToken: token});
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.error || "An error occurred during refresh"
      );
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      console.log("Checking condition for refresh:", token);
      return !!token;
    },
  }
);
