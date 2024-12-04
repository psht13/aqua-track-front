import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const { data } = await instance.get("/users/me");

    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response.data?.data.error || "An error occurred"
    );
  }
});

export const patchUser = createAsyncThunk(
  "user/patchUser",
  async (data, thunkAPI) => {
    try {
      const { data } = await instance.patch("/users/me", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data?.data.error || "An error occurred"
      );
    }
  }
);
