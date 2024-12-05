import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const fetchWaterByDay = createAsyncThunk(
  "user/fetchWaterByDay",
  async (day, thunkAPI) => {
    try {
      const { data } = await instance.get(`/water/day`, {
        params: { day },
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching water data"
      );
    }
  }
);

export const deleteWaterRecord = createAsyncThunk(
  "user/deleteWaterRecord",
  async (recordId, thunkAPI) => {
    try {
      await instance.delete(`/water/${recordId}`);
      return recordId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error deleting water record"
      );
    }
  }
);

const waterSlice = createSlice({
  name: "userWater",
  initialState: {
    waterData: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchWaterByDay
      .addCase(fetchWaterByDay.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaterByDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData = action.payload || [];
      })
      .addCase(fetchWaterByDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // deleteWaterRecord
      .addCase(deleteWaterRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData = state.waterData.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default waterSlice.reducer;
