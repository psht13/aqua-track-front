import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8081",
});

const SetAuthHeaders = (token) => {
  instance.defaults.headers.common["Authorization"] = `${token}`;
};
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    axios.defaults.headers.common['Authorization'] = '';
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const apiRegister = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/users/signup", formData);
      SetAuthHeaders(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post("/users/login", formData);
      SetAuthHeaders(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await instance.post("/users/logout");
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message || 'An error occurred');
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
      const { data } = await instance.get("/users/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data.message || 'An error occurred');
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