import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// console.log(import.meta.env.VITE_BASE_URL);

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const SetAuthHeaders = (token) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const logOut = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
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
      SetAuthHeaders(data.accessToken);
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
      const accessToken = data.data.accessToken;

      SetAuthHeaders(accessToken);

      const user = await thunkAPI.dispatch(fetchCurrentUser()).unwrap();

      return { accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "An error occurred"
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
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      SetAuthHeaders(token);
      const { data } = await instance.get("/auth/refresh");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response.data?.data.error || "An error occurred"
      );
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      return !!token;
    },
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/users/me");
      return data.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const fetchWaterByDay = createAsyncThunk(
  "water/fetchWaterByDay",
  async (day, thunkAPI) => {
    try {
      const { data } = await axios.get(`/water/day`, {
        params: { day },
      });
      console.log("Water data response:", data);
      return data.data;
    } catch (error) {
      console.error("Failed to fetch water data:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching water data"
      );
    }
  }
);