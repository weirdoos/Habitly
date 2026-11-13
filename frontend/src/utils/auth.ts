import { useAuth } from "../context/UserContext";
import { apiClient, setAccessToken } from "./axios";

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload): Promise<User> {
  const { data } = await apiClient.post<{ user: User; accessToken: string }>(
    "/auth/register",
    payload,
  );

  setAccessToken(data.accessToken);
  return data.user;
}

export async function login(payload: LoginPayload): Promise<User> {
  const { data } = await apiClient.post<{ user: User; accessToken: string }>(
    "/auth/login",
    payload,
  );

  setAccessToken(data.accessToken);
  return data.user;
}

export async function logout() {
  await apiClient.post<void>("/auth/logout");
}
