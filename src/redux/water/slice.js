import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  addWater,
  deleteWater,
  updateWater,
  getDayWater,
  getMonthWater,
} from "./operations";

const INITIAL_STATE = {
  dayWater: [],
  todayWater: [],
  monthWater: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    style: {
      background: "var(--accent)",
      color: "var(--main-white)",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      background: "#ff0000",
      color: "var(--main-white)",
    },
  });
};

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.todayWater.push(payload.data);
        showSuccessToast("Water added successfully!");
      })
      .addCase(addWater.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        showErrorToast("Oops, failed to add water");
      })
      .addCase(updateWater.pending, handlePending)
      .addCase(updateWater.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.dayWater.findIndex(
          (item) => item._id === payload.data._id
        );
        state.todayWater.splice(index, 1, payload.data);
        showSuccessToast("Water edited successfully!");
      })
      .addCase(updateWater.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        showErrorToast("Oops, failed to remove water");
      })
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const searchIndex = state.dayWater.findIndex(
          (item) => item._id === payload
        );
        state.dayWater.splice(searchIndex, 1);
        state.todayWater = [...state.dayWater];
        showSuccessToast("Water removed successfully!");
      })
      .addCase(deleteWater.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        showErrorToast("Oops, failed to remove water");
      })
      .addCase(getDayWater.pending, handlePending)
      .addCase(getDayWater.fulfilled, (state, { payload }) => {
        console.log("Payload from getDayWater:", payload);
        state.isLoading = false;
        state.dayWater = payload.date;
        state.todayWater = payload.date.today || [...state.todayWater];
      })
      .addCase(getDayWater.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        showErrorToast("Oops, failed to fetch the water of this day");
      })
      .addCase(getMonthWater.pending, handlePending)
      .addCase(getMonthWater.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.monthWater = payload.date;
      })
      .addCase(getMonthWater.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        showErrorToast("Oops, failed to fetch the water of this day");
      });
  },
});

export const waterReducer = waterSlice.reducer;
