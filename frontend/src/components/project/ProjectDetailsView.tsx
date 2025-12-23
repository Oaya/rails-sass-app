import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useProjectData } from "../../hooks/useProjectData";

const ProjectDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const projectId = id ?? null;

  const { data: project, isLoading, error } = useProjectData(projectId!);

  if (isLoading) {
    return (
      <div className="m-10 text-center text-2xl">Loading the project.</div>
    );
  }

  if (error) {
    return <div className="m-10 text-center text-2xl">{error.message}</div>;
  }

  return (
    <div className="m-10 mx-auto px-20 text-2xl">
      <h2>Hello, {user?.first_name}</h2>
      <p>Your organization is {user?.tenant_name}</p>

      {!project ? (
        <div className="m-10 text-center text-2xl">Project not found</div>
      ) : (
        <div className="m-10">
          <h2 className="text-3xl">Title: {project.title}</h2>
          <p className="mt-4">Details: {project.details}</p>
          <p className="mt-2">
            Expected Completion Date;{project.expected_completion_date}
          </p>
        </div>
      )}
    </div>
  );
};
export default ProjectDetailsView;
