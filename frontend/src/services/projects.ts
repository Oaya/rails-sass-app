import axios from "axios";
import type { CreateProject, Project } from "../types/project";

export async function createProjectRequest(
  data: CreateProject,
): Promise<ApiResponse> {
  const token = localStorage.getItem("jwt");

  if (!token) return { success: false, error: "No token" };

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

    return { success: true, status: res.status };
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to invite member");
  }
}

export async function getProjectsRequest(): Promise<Project[]> {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token");

  try {
    const res = await axios.get<Project[]>(
      `${import.meta.env.VITE_API_URL}/api/projects`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(res.data);

    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to fetch projects");
  }
}
