import { createContext, useContext, useState, type ReactNode } from "react";
import { loginRequest } from "../services/auth";

export type User = {
  id: string;
  email: string;
};

export type LoginUser = {
  password: string;
  email: string;
};

const AuthContext = createContext<{
  user: User | null;
  login: (user: LoginUser) => Promise<void>;
}>({
  user: null,
  login: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(user: LoginUser) {
    const loggedInUser = await loginRequest(user);

    if (loggedInUser.token) {
      localStorage.setItem("jwt", loggedInUser.token);
    }
    setUser(loggedInUser);
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
