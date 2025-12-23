export type CreateResource = {
  projectId: string;
  title: string;
  file: File;
  onProgress: (p: number) => void;
};
