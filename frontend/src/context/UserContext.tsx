import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { type AuthContextValue } from "../types/AuthContext.types";
import type { AuthStatus } from "../types/AuthContext.types";
import { apiClient } from "../utils/axios";
import * as authApi from "./../utils/auth";

interface User {
  id: string;
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const accessRef = useRef<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiClient.get<User>("/users/me");
        setUser(data.data);
      } catch {
        throw new Error();
      }
    })();
  }, []);

  const login = useCallback(async (payload: authApi.LoginPayload) => {
    const { data } = await authApi.login(payload);
    setUser(data);
    setStatus("authenticated");
  }, []);

  const register = useCallback(async (payload: authApi.RegisterPayload) => {
    const { data } = await authApi.register(payload);
    setUser(data);
    setStatus("authenticated");
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setStatus("guest");
    }
  }, []);

  const value: AuthContextValue = {
    user,
    status,
    accessRef,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("error");
  return ctx;
}
