import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const addWater = createAsyncThunk(
  "water/add",
  async (waterData, thunkAPI) => {
    try {
      const { data } = await instance.post("/waters", waterData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  "water/edit",
  async (waterData, thunkAPI) => {
    try {
      const { _id, ...editData } = waterData;
      const { data } = await instance.patch(`/waters/${_id}`, editData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/delete",
  async (_id, thunkAPI) => {
    try {
      await instance.delete(`/waters/${_id}`);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDayWater = createAsyncThunk(
  "water/getDay",
  async (date, thunkAPI) => {
    try {
      const { data } = await instance.get(`/waters/day/${date}`);
      if (date === new Date().toISOString().split("T")[0]) {
        data.date.today = [...data.date];
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMonthWater = createAsyncThunk(
  "water/getMonth",
  async (yearMonth, thunkAPI) => {
    try {
      const { data } = await instance.get(`/waters/month/${yearMonth}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
