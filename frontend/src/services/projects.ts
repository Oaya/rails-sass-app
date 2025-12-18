import axios from "axios";
import type { Project } from "../types/project";

export async function createProjectRequest(
  data: Project,
): Promise<ApiResponse> {
  const token = localStorage.getItem("jwt");

  if (!token) return { success: false, error: "No token" };

  console.log(data);

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/projects`,
      { project: data },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res);

    return { success: true, data: res.data, status: res.status };
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to invite member");
  }
}
