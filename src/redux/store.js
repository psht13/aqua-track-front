import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import storage from "redux-persist/lib/storage";
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

const authConfig = {
	key: "auth",
	storage,
	whitelist: ["token"],
};

export const store = configureStore({
	reducer: {
		auth: persistReducer(authConfig, authReducer),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
