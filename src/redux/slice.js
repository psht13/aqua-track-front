import { createSlice } from "@reduxjs/toolkit";
import { apiLogin, apiLogout, apiRefreshUser, fetchCurrentUser, fetchWaterByDay } from "./operations"; // якщо у вас є ці операції

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(apiLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(apiLogout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(apiLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Logout failed";
      })
      .addCase(apiRefreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken || state.token;
        state.isAuthenticated = true;
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(apiRefreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = action.payload || "Refresh failed";
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload; // Сохраняем данные пользователя
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user";
      })
      .addCase(fetchWaterByDay.pending, (state) => {
        console.log("Fetching water data...");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaterByDay.fulfilled, (state, action) => {
        console.log("Fetched water data successfully:", action.payload);
        state.isLoading = false;
        state.waterData = action.payload; // Сохраняем данные в состоянии
      })
      .addCase(fetchWaterByDay.rejected, (state, action) => {
        console.error("Error fetching water data:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
