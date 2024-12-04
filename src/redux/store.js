import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import userReducer from "./user-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
=======
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
import authReducer from "./slice"; 


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], 
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); 
export { store };
>>>>>>> main
