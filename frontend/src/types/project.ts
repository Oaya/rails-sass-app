export type CreateProject = {
  title: string;
  details: string;
  expected_completion_date: string;
};

export type Project = {
  id: number;
  title: string;
  details: string;
  expected_completion_date: string;
  created_by: {
    first_name: string;
    last_name: string;
  };
};

export type UpdateProject = {
  id: number;
  title?: string;
  details?: string;
  expected_completion_date?: string;
};

export type Resource = {
  id: number;
  title: string;
};

export type ProjectWithResources = Project & {
  resources?: Resource[];
};
