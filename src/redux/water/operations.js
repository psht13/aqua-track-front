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
  async ({ id, amount, date }, thunkAPI) => {
    try {
      const { data } = await instance.patch(`/waters/${id}`, { amount, date });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const updateWater = createAsyncThunk(
//   "water/edit",
//   async (waterData, thunkAPI) => {
//     try {
//       const { id, ...editData } = waterData;
//       const { data } = await instance.patch(`/waters/${id}`, editData);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const deleteWater = createAsyncThunk(
  "water/delete",
  async (id, thunkAPI) => {
    try {
      await instance.delete(`/waters/${id}`);
      return id;
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


      return { day, data };
    } catch (error) {
      console.error("Error fetching day water data:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
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
