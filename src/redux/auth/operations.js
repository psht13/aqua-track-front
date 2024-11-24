export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await instance.post('/auth/reset-password', {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },