import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  addWater,
  deleteWater,
  updateWater,
  getDayWater,
  getMonthWater,
} from "./operations";
import { logOut } from "../auth/operations";

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
  reducers: {
    clearWater(state) {
      state.dayWater = [];
      state.todayWater = [];
      state.monthWater = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.todayWater = [...state.todayWater, payload.data]; // Додаємо новий елемент в кінець
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
        state.todayWater = state.todayWater.map(
          (item) => (item._id === payload.data._id ? payload.data : item) // Оновлюємо елемент з відповідним id
        );
        showSuccessToast("Water edited successfully!");
      })
      .addCase(updateWater.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        showErrorToast("Oops, failed to update water");
      })
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dayWater = state.dayWater.filter((item) => item._id !== payload); // Фільтруємо елемент за id
        state.todayWater = state.dayWater; // Оновлюємо todayWater після видалення
        showSuccessToast("Water removed successfully!");
      })
      .addCase(deleteWater.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        showErrorToast("Oops, failed to remove water");
      })
      .addCase(getDayWater.pending, handlePending)
      .addCase(getDayWater.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dayWater = payload.data;
        if (payload.day == new Date().toISOString().split("T")[0]) {
          state.todayWater = payload.data; // Заміщуємо старі дані новими
        }
      })
      .addCase(getDayWater.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        showErrorToast("Oops, failed to fetch the water of this day");
      })
      .addCase(getMonthWater.pending, handlePending)
      .addCase(getMonthWater.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.monthWater = payload.date; // Заміщуємо місячні дані
      })
      .addCase(getMonthWater.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        showErrorToast("Oops, failed to fetch the water of this month");
      })
      .addCase(logOut.fulfilled, (state) => {
        state.dayWater = [];
        state.todayWater = [];
        state.monthWater = [];
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { clearWater } = waterSlice.actions;

export default waterSlice.reducer;
