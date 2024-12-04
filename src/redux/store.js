import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import userReducer from "./user/slice";

import { waterReducer } from "./water/slice";
import { instance } from "./auth/operations";



const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // Перевірте, що тут є "token"
};
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    water: waterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const state = store.getState();
const token = state.auth?.token;

if (token) {
  console.log("Initializing token from persisted state:", token);
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const persistor = persistStore(store);
export { store };
