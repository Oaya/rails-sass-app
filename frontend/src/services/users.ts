import axios from "axios";
import type { AddMemberUser } from "../types/user";

export async function inviteMember(user: AddMemberUser): Promise<ApiResponse> {
  const token = localStorage.getItem("jwt");
  if (!token) return { success: false, error: "No token" };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/invitation`,
      { user },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { success: true, data: res.data, status: res.status };
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to invite member");
  }
}
