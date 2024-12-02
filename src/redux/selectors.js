export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthIsLoggedIn = (state) => state.auth.isAuthenticated;
export const selectAuthIsRefreshing = (state) => state.auth.isRefreshing;
export const selectAuthError = (state) => state.auth.error;
