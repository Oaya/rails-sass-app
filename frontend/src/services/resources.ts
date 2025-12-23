import axios from "axios";
import type { CreateResource } from "../types/resource";

export async function initialResourceUpload({
  projectId,
  title,
  file,
}: {
  projectId: string;
  title: string;
  file: File;
}) {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token");

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/projects/${projectId}/resources`,
    {
      title,
      filename: file.name,
      content_type: file.type || "application/octet-stream",
      byte_size: file.size,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
}

export async function uploadFile({
  putUrl,
  file,
  onProgress,
  signal,
}: {
  putUrl: string;
  file: File;
  onProgress: (p: number) => void;
  signal?: AbortSignal;
}) {
  await axios.put(putUrl, file, {
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    onUploadProgress: (e) => {
      if (e.total) onProgress((e.loaded / e.total) * 100);
    },
    signal,
  });
}

export async function completeResource(resourceId: number) {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token");

  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/resources/${resourceId}/complete`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function uploadResource(data: CreateResource) {
  const { id, put_url } = await initialResourceUpload({
    projectId: data.projectId,
    title: data.title,
    file: data.file,
  });

  await uploadFile({
    putUrl: put_url,
    file: data.file,
    onProgress: data.onProgress,
  });
  await completeResource(id);
  return id;
}

export async function getResourceDownloadUrl(resourceId: number) {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token");

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/resources/${resourceId}/download_url`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data.url;
}
