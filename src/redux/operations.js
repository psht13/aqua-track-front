import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
<<<<<<< Updated upstream
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

=======
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, 
});

// Реєстрація користувача
>>>>>>> Stashed changes
export const apiRegister = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
<<<<<<< Updated upstream
      const { data } = await instance.post("/users/signup", formData);
      SetAuthHeaders(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message || 'An error occurred');
=======
      const { data } = await instance.post("/auth/register", formData);
      return { id: data.id }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
>>>>>>> Stashed changes
    }
  }
);

// Логін користувача
export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
<<<<<<< Updated upstream
      const { data } = await instance.post("/users/login", formData);
      SetAuthHeaders(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message || 'An error occurred');
=======
      const { data } = await instance.post("/auth/login", formData);
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
>>>>>>> Stashed changes
    }
  }
);

// Логаут користувача
export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
<<<<<<< Updated upstream
      await instance.post("/users/logout");
      return;
=======
      await instance.post("/auth/logout");
>>>>>>> Stashed changes
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

// Оновлення користувача
export const apiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
<<<<<<< Updated upstream
      const state = thunkApi.getState();
      const token = state.auth.token;
      SetAuthHeaders(token);
      const { data } = await instance.get("/users/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data.message || 'An error occurred');
=======
      const { data } = await instance.post("/auth/refresh"); 
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
>>>>>>> Stashed changes
    }
  }
);