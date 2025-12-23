import { useQuery } from "@tanstack/react-query";
import type { ProjectWithResources } from "../types/project";
import { getProjectAndResourcesById } from "../services/projects";

export const useProjectData = (projectId: string | null) => {
  return useQuery<ProjectWithResources, Error>({
    queryKey: ["project", projectId],
    queryFn: () => getProjectAndResourcesById(projectId as string),
    enabled: !!projectId,
  });
};
