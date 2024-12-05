import { createSlice } from "@reduxjs/toolkit";
import { apiLogin, logOut, apiRefreshUser } from "./operations"; // Якщо у вас є ці операції

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
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обробка логіну
      .addCase(apiLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        console.log(
          "Token in action payload:",
          action.payload.data.accessToken
        ); // Логуємо токен
        state.token = action.payload.data.accessToken;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      })

      // Обробка логауту
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Logout failed";
      })

      // Обробка рефрешу
      .addCase(apiRefreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
  console.log("Refresh successful:", action.payload);
  state.user = action.payload.data.user;
  state.token = action.payload.data.accessToken || state.token; 
  state.isAuthenticated = true;
  state.isRefreshing = false;
  state.isLoading = false;
  state.error = null;
})
      .addCase(apiRefreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.token = null;
        state.error = action.payload || "Refresh failed";
      });
  },
});

export const { loginSuccess, loginFailure, logout, resetError } =
  authSlice.actions;
export default authSlice.reducer;
