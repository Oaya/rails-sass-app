import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  useEffect,
} from "react";
import {
  acceptInviteRequest,
  confirmAndSignIn,
  getAuthUserRequest,
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
import type { InviteUser } from "../types/user";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (userData: LoginUser) => Promise<ApiResponse>;
  signup: (userData: SignupUser) => Promise<ApiResponse>;
  confirmEmail: (token: string) => Promise<ApiResponse>;
  sendResetPasswordEmail: (email: string) => Promise<ApiResponse>;
  updatePassword: (data: UpdatePasswordUser) => Promise<ApiResponse>;
  logout: () => Promise<void>;
  acceptInvite: (data: InviteUser) => Promise<ApiResponse>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ success: true }),
  signup: async () => ({ success: true }),
  confirmEmail: async () => ({ success: true }),
  sendResetPasswordEmail: async () => ({ success: true }),
  updatePassword: async () => ({ success: true }),
  logout: async () => {},
  acceptInvite: async () => ({ success: true }),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await getAuthUserRequest();
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("jwt");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (userData: LoginUser) => {
    const res = await loginRequest(userData);
    console.log(res);

    if (res.success && res.data) {
      setUser(res.data.user);
    }

    return res;
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

  const logout = useCallback(async () => {
    localStorage.removeItem("jwt");
    setUser(null);
  }, []);

  const acceptInvite = useCallback(async (data: InviteUser) => {
    const res = await acceptInviteRequest(data);

    if (res.success && res.data) {
      localStorage.setItem("jwt", res.data.token);
      setUser(res.data.user);
    }
    return res;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      signup,
      confirmEmail,
      sendResetPasswordEmail,
      updatePassword,
      logout,
      acceptInvite,
    }),
    [
      user,
      isLoading,
      login,
      signup,
      confirmEmail,
      sendResetPasswordEmail,
      updatePassword,
      logout,
      acceptInvite,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
