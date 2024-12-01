import { createSlice } from "@reduxjs/toolkit";
import { apiRegister, apiLogin, apiLogout, apiRefreshUser } from "./operations";

const initialState = {
  token: null,
  user: null, 
  isAuthenticated: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(apiRegister.fulfilled, (state, action) => {
        state.user = { id: action.payload.id }; 
        state.isAuthenticated = false; 
        state.error = null;
      })
      .addCase(apiRegister.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.user = action.payload.user; 
        state.token = action.payload.token; 
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(apiLogout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
     
      .addCase(apiRefreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isRefreshing = false;
      })
      .addCase(apiRefreshUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isRefreshing = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;