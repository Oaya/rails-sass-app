import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ProjectWithResources } from "../types/project";
import { getProjectAndResourcesById } from "../services/projects";
import { uploadResource } from "../services/resources";
import type { CreateResource } from "../types/resource";

export const useProjectData = (projectId: string | null) => {
  const queryClient = useQueryClient();

  const {
    data: project,
    error,
    isLoading,
  } = useQuery<ProjectWithResources, Error>({
    queryKey: ["project", projectId],
    queryFn: () => getProjectAndResourcesById(projectId as string),
    enabled: !!projectId,
  });

  const addResourceMutation = useMutation<number, Error, CreateResource>({
    mutationFn: uploadResource,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });

  return {
    project,
    error,
    isLoading,
    addResourceMutation,
  };
};
