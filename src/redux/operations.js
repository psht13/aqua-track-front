import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiLogin = createAsyncThunk("auth/login", async (credentials) => {
  const { data } = await axios.post("/api/login", credentials);
  return data;
});

export const apiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token available");
    }

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { data } = await axios.get("/api/refresh");
    return data;
  }
);
