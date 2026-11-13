export interface User {
  id: string;
  username: string;
  accessToken: string;
}

export type AuthStatus = "loading" | "authenticated" | "guest";

export type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  accessRef: React.RefObject<string | null>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
};
