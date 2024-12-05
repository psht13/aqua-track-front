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
  "water/getDayWater",
  async (day, thunkAPI) => {
    try {
      const { data: fetchedData } = await instance.get(`/waters/day`, {
        params: { day },
      });

      const data = fetchedData.data;

      console.log(data);
      

      // if (!data || !data.date) {
      //   throw new Error("Invalid data structure received");
      // }

      // if (day === new Date().toISOString().split("T")[0]) {
      //   data.date.today = [...data.date];
      // }

      // console.log(data.date.today || 'No data available for today');
      
      return data;
    } catch (error) {
      console.error("Error fetching day water data:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);

export const getMonthWater = createAsyncThunk(
  "water/getMonth",
  async ({ fromDate, toDate }, thunkAPI) => {
    try {
      const { data } = await instance.get(`/waters/month/`, {
        params: { fromDate, toDate },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
