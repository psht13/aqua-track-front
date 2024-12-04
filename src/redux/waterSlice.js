import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный экшен для получения данных о воде за день
export const fetchWaterByDay = createAsyncThunk(
  "water/fetchWaterByDay",
  async (day, thunkAPI) => {
    try {
      console.log("Fetching water data for day:", day); // Лог выбранной даты
      const { data } = await axios.get(`/water/day`, {
        params: { day }, // Передаём дату как параметр
      });
      console.log("Water data fetched:", data); // Лог ответа от сервера
      return data.data; // Возвращаем список записей
    } catch (error) {
      console.error("Failed to fetch water data:", error); // Лог ошибки
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching water data"
      );
    }
  }
);

// Асинхронный экшен для удаления записи
export const deleteWaterRecord = createAsyncThunk(
  "water/deleteWaterRecord",
  async (recordId, thunkAPI) => {
    try {
      console.log("Deleting water record with ID:", recordId); // Лог ID записи
      await axios.delete(`/water/${recordId}`);
      console.log("Water record deleted successfully:", recordId); // Лог успешного удаления
      return recordId; // Возвращаем ID удалённой записи
    } catch (error) {
      console.error("Failed to delete water record:", error); // Лог ошибки
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error deleting water record"
      );
    }
  }
);

// Редьюсер и начальное состояние
const waterSlice = createSlice({
  name: "water",
  initialState: {
    waterData: [
      { id: 1, amount: 250, date: "2024-12-01T07:00:00" },
      { id: 2, amount: 500, date: "2024-12-01T12:00:00" },
      { id: 3, amount: 300, date: "2024-12-01T16:00:00" },], // Данные о воде
    isLoading: false, // Флаг загрузки
    error: null, // Ошибки
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка fetchWaterByDay
      .addCase(fetchWaterByDay.pending, (state) => {
        console.log("Fetching water data..."); // Лог начала загрузки
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaterByDay.fulfilled, (state, action) => {
        console.log("Water data fetched successfully:", action.payload); // Лог успешного ответа
        state.isLoading = false;
        state.waterData = action.payload || []; // Обновляем данные о воде
      })
      .addCase(fetchWaterByDay.rejected, (state, action) => {
        console.error("Error fetching water data:", action.payload); // Лог ошибки
        state.isLoading = false;
        state.error = action.payload; // Сохраняем ошибку
      })
      // Обработка deleteWaterRecord
      .addCase(deleteWaterRecord.pending, (state) => {
        console.log("Deleting water record..."); // Лог начала удаления
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        console.log("Water record deleted:", action.payload); // Лог успешного удаления
        state.isLoading = false;
        state.waterData = state.waterData.filter(
          (item) => item.id !== action.payload
        ); // Удаляем запись из состояния
      })
      .addCase(deleteWaterRecord.rejected, (state, action) => {
        console.error("Error deleting water record:", action.payload); // Лог ошибки
        state.isLoading = false;
        state.error = action.payload; // Сохраняем ошибку
      });
  },
});

export default waterSlice.reducer;
