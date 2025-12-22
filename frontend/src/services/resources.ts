import axios from "axios";

export async function initialResourceUpload({
  title,
  file,
}: {
  title: string;
  file: File;
}) {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/resources`,
    {
      title,
      filename: file.name,
      content_type: file.type || "application/octet-stream",
      byte_size: file.size,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    },
  );

  console.log(res.data);

  return res.data; // { resource, put_url }
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
  await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/resources/${resourceId}/complete`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.token}` } },
  );
}

export async function uploadResource({
  title,
  file,
  onProgress,
}: {
  title: string;
  file: File;
  onProgress: (p: number) => void;
}) {
  const { resource, put_url } = await initialResourceUpload({ title, file });
  await uploadFile({ putUrl: put_url, file, onProgress });
  await completeResource(resource.id);
  return resource.id;
}

export async function getResourceDownloadUrl(resourceId: number) {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/resources/${resourceId}/download_url`,
    { headers: { Authorization: `Bearer ${localStorage.token}` } },
  );

  return res.data.url;
}
