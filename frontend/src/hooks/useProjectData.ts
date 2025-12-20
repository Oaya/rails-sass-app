import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  getProjects,
  updateProject,
} from "../services/projects";
import type { CreateProject, Project, UpdateProject } from "../types/project";

export const useProjectData = () => {
  const queryClient = useQueryClient();

  const {
    data: projects,
    error,
    isLoading,
  } = useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: getProjects,
    select: (data) => data ?? [],
  });

  const addProjectMutation = useMutation<Project, Error, CreateProject>({
    mutationFn: createProject,
    onSuccess: (project) => {
      queryClient.setQueryData<Project[]>(["projects"], (old = []) => {
        if (old.some((p) => p.id === project.id)) return old;
        return [...old, project];
      });
    },
  });

  const updateProjectMutation = useMutation<Project, Error, UpdateProject>({
    mutationFn: updateProject,
    onSuccess: (updated) => {
      queryClient.setQueryData<Project[]>(["projects"], (old = []) => {
        old.map((p) => (p.id === updated.id ? updated : p));
      });
    },
  });

  return {
    projects: projects ?? [],
    error,
    isLoading,
    addProjectMutation,
    updateProjectMutation,
  };
};
