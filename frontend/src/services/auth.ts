import type { LoginUser, SignupUser, User } from "../types/auth";
import axios from "axios";

export async function loginRequest(user: LoginUser): Promise<ApiResponse> {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/sign_in`,
      { user },
    );

    const data = res.data;

    const authHeader = res.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new Error("No token Error");
    }

    localStorage.setItem("jwt", token);

    const loggedInUser: User = {
      id: data.user.id,
      email: data.user.email,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      is_admin: data.user.is_admin,
      tenant_id: data.user.tenant.id,
      plan: data.user.tenant.plan,
    };

    return { success: true, data: loggedInUser };
  } catch (err: any) {
    throw new Error(`Error: ${err.response.data.error}`);
  }
}

export async function signupRequest(user: SignupUser): Promise<ApiResponse> {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
      user: {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      tenant: {
        name: user.tenant,
        plan: user.plan,
      },
    });

    const data = res.data;

    return { success: true, message: data.message };
  } catch (err: any) {
    throw new Error(`Error: ${err.response.data.error}`);
  }
}

export async function confirmAndSignIn(token: string): Promise<ApiResponse> {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/confirm_signin`,
      { confirmation_token: token },
    );

    const data = res.data;

    return { success: true, data };
  } catch (err: any) {
    throw new Error(`Error: ${err.response.data.error}`);
  }
}

export async function resetPasswordRequest(
  email: string,
): Promise<ApiResponse> {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/password`,
      {
        user: { email },
      },
    );

    const data = res.data;

    return { success: true, data };
  } catch (err: any) {
    throw new Error(`Error: ${err.response.data.error}`);
  }
}
