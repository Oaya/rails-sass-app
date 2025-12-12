import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  confirmAndSignIn,
  loginRequest,
  resetPasswordEmailRequest,
  signupRequest,
  updatePasswordRequest,
} from "../services/auth";
import type {
  LoginUser,
  SignupUser,
  UpdatePasswordUser,
  User,
} from "../types/auth";

type AuthContextType = {
  user: User | null;
  login: (userData: LoginUser) => Promise<void>;
  signup: (userData: SignupUser) => Promise<ApiResponse>;
  confirmEmail: (token: string) => Promise<ApiResponse>;
  sendResetPasswordEmail: (email: string) => Promise<ApiResponse>;
  updatePassword: (data: UpdatePasswordUser) => Promise<ApiResponse>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => ({ success: true }),
  confirmEmail: async () => ({ success: true }),
  sendResetPasswordEmail: async () => ({ success: true }),
  updatePassword: async () => ({ success: true }),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (userData: LoginUser) => {
    const res = await loginRequest(userData);
    setUser(res.data);
  }, []);

  const signup = useCallback(async (userData: SignupUser) => {
    const res = await signupRequest(userData);
    return res;
  }, []);

  const confirmEmail = useCallback(async (token: string) => {
    const res = await confirmAndSignIn(token);

    if (res.success && res.data) {
      localStorage.setItem("jwt", res.data.token);
      setUser(res.data.user);
    }

    return res;
  }, []);

  const sendResetPasswordEmail = useCallback(async (email: string) => {
    const res = await resetPasswordEmailRequest(email);

    return res;
  }, []);

  const updatePassword = useCallback(async (data: UpdatePasswordUser) => {
    const res = await updatePasswordRequest(data);

    if (res.success && res.data) {
      localStorage.setItem("jwt", res.data.token);
      setUser(res.data.user);
    }
    return res;
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      confirmEmail,
      sendResetPasswordEmail,
      updatePassword,
    }),
    [user, login, signup, confirmEmail, sendResetPasswordEmail, updatePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
