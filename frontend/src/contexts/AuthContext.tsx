import { createContext, useContext, useState, type ReactNode } from "react";
import {
  confirmAndSignIn,
  loginRequest,
  signupRequest,
} from "../services/auth";
import type { LoginUser, SignupUser, User } from "../types/auth";

const AuthContext = createContext<{
  user: User | null;
  login: (userData: LoginUser) => Promise<void>;
  signup: (userData: SignupUser) => Promise<ApiResponse>;
  confirmEmail: (token: string) => Promise<ApiResponse>;
}>({
  user: null,
  login: async () => {},
  signup: async () => ({ success: true }),
  confirmEmail: async () => ({ success: true }),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(userData: LoginUser) {
    const res = await loginRequest(userData);
    setUser(res.data);
  }

  async function signup(user: SignupUser) {
    const res = await signupRequest(user);
    return res;
  }

  async function confirmEmail(token: string) {
    const res = await confirmAndSignIn(token);

    if (res.success && res.data) {
      localStorage.setItem("jwt", res.data.token);
      setUser(res.data.user);
    }

    return res;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, confirmEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
