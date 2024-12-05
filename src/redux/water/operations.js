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
  async (day, thunkAPI) => {
    try {
      const formattedDate = new Date().toISOString().split("T")[0];

      const { data } = await instance.get(`/waters/day`, {
        params: { day: formattedDate },
      });
      // if (day === new Date().toISOString().split("T")[0]) {
      //   data.date.today = [...data.date];
      // }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMonthWater = createAsyncThunk(
  "water/getMonth",
  async ({ fromDate, toDate }, thunkAPI) => {
    try {
      const formattedfromDate = fromDate.toISOString().split("T")[0];
      const formattedetoDate = toDate.toISOString().split("T")[0];

      const { data } = await instance.get(`/waters/month/`, {
        params: { from: formattedfromDate, to: formattedetoDate },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
