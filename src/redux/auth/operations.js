import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
	baseURL: "https://aqua-track-back.up.railway.app/",
});

const setAuthHeaders = (token) => {
	instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiLogin = createAsyncThunk(
	"login",
	async (formData, thunkApi) => {
		try {
			const { data } = await instance.post("auth/login", formData);
			setAuthHeaders(data.accessToken); // Змінено на `accessToken` відповідно до OpenAPI
			return data;
		} catch (error) {
			const { status, message } = error.response?.data || {};
			return thunkApi.rejectWithValue({ status, message });
		}
	}
);

export const apiRegister = createAsyncThunk(
	"register",
	async (formData, thunkApi) => {
		try {
			const { data } = await instance.post("auth/register", formData);
			setAuthHeaders(data.accessToken);
			return data;
		} catch (error) {
			const { status, message } = error.response?.data || {};
			return thunkApi.rejectWithValue({ status, message });
		}
	}
);

export const apiRefreshUser = createAsyncThunk(
	"refresh",
	async (_, thunkApi) => {
		try {
			const state = thunkApi.getState();
			const token = state.auth.token;
			setAuthHeaders(token);
			const { data } = await instance.get("auth/refresh");
			return data;
		} catch (error) {
			const { status, message } = error.response?.data || {};
			return thunkApi.rejectWithValue({ status, message });
		}
	},
	{
		condition: (_, thunkApi) => {
			const state = thunkApi.getState();
			const token = state.auth.token;
			if (token) return true;
			return false;
		},
	}
);

export const apiLogout = createAsyncThunk("logout", async (_, thunkApi) => {
	try {
		await instance.post("auth/logout");
		setAuthHeaders("");
		return;
	} catch (error) {
		const { status, message } = error.response?.data || {};
		return thunkApi.rejectWithValue({ status, message });
	}
});
