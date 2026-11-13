import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export let accessToken: string | null = null;

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};

export const getAccessToken = (): string | null => accessToken;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_URL ?? "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status !== 401 ||
      original.url?.includes("/auth/refresh") ||
      original._retry
    ) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (!refreshPromise) {
      refreshPromise = apiClient
        .post<{ accessToken: string }>("/auth/refresh")
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          return data.accessToken;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    try {
      const newToken = await refreshPromise;
      original.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(original);
    } catch (refreshError) {
      const { logout } = useAuth();
      const navigate = useNavigate();
      navigate("/sign-in");
      setAccessToken(null);
      logout();
      return Promise.reject(refreshError);
    }
  },
);
