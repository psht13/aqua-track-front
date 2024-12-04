import { createSlice } from "@reduxjs/toolkit";
import { getUser, patchUser } from "./operations"; // якщо у вас є ці операції

const initialState = {
  user: {},
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "error";
      })
      .addCase(patchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(patchUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(patchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "error";
      });
  },
});

export default userSlice.reducer;
