import { createSlice } from "@reduxjs/toolkit";
import { apiRefreshUser } from "./auth/operations";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiRefreshUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(apiRefreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Token refresh failed.";
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
