import { createSlice } from "@reduxjs/toolkit";
import { apiRegister, apiLogin } from "./auth/operations.js"; 

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;

      })
      .addCase(apiRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed.";
      })
      .addCase(apiLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
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
        state.error = action.payload || "Login after registration failed.";
      });
  },
});

export const { resetError } = registerSlice.actions;
export default registerSlice.reducer;
