import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = "https://prowebtech.uz";

export const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthApi = {
  async register(body: { username: string; email: string; password: string; password2: string }) {
    const { data } = await instance.post("/api/v1/auth/register", body);
    return data;
  },
  async login(body: { username: string; password: string }) {
    const { data } = await instance.post("/api/v1/auth/login", body);
    return data;
  },
  async getProfile() {
    const { data } = await instance.get("/api/v1/auth/users/profile");
    return data;
  },
};

export const ProductsApi = {
  async getAll(params?: { limit?: number; offset?: number; search?: string; ordering?: string }) {
    const { data } = await instance.get("/api/v1/products", { params });
    return data;
  },
};
