import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProjectRequest, getProjectsRequest } from "../services/projects";
import type { CreateProject, Project } from "../types/project";

export const useProjectData = () => {
  const queryClient = useQueryClient();

  const {
    data: projects = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsRequest(),
    // enabled: !!userId,
  });

  // Add mutation
  const addProjectMutation = useMutation({
    mutationFn: (payload: CreateProject) => createProjectRequest(payload),
    onSuccess: ({ project }) => {
      queryClient.setQueryData<Project[]>(["projects"], (old = []) => {
        if (!old) return [project];
        if (old.some((p) => p.id === project.id)) return old;
        return [...old, project];
      });
    },
  });

  return {
    projects,
    error,
    isLoading,
    addProjectMutation,
  };
};
