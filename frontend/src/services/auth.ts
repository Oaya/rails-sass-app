import type { LoginUser, SignupUser, UpdatePasswordUser } from "../types/auth";
import axios from "axios";
import type { InviteUser } from "../types/user";

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

    //Store token
    localStorage.setItem("jwt", token);

    return { success: true, data };
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

export async function getAuthUserRequest(): Promise<ApiResponse> {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return { success: false, error: "No token" };
    }

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: res.data };
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to get Auth user");
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

export async function resetPasswordEmailRequest(
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

export async function updatePasswordRequest(
  user: UpdatePasswordUser,
): Promise<ApiResponse> {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/users/password`,
      { user },
    );

    const data = res.data;

    return { success: true, data };
  } catch (err: any) {
    throw new Error(`Error: ${err.response.data.error}`);
  }
}

export async function acceptInviteRequest(
  user: InviteUser,
): Promise<ApiResponse> {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/users/invitation`,
      { user },
    );

    return { success: true, data: res.data, status: res.status };
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to accept invitation");
  }
}
