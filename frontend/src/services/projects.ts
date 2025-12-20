import axios from "axios";
import type { CreateProject, Project, UpdateProject } from "../types/project";

export async function getProjects(): Promise<Project[]> {
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

    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to fetch projects");
  }
}

export async function createProject(data: CreateProject): Promise<Project> {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token");

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

  return res.data;
}

export async function updateProject(data: UpdateProject): Promise<Project> {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token");

  const res = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/projects/${data.id}`,
    { project: data },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
}

export async function deleteProject(id: number) {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token");

  const res = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
}
