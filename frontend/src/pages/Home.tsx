import { useState } from "react";
import Toast from "../components/ui/Toast";
import { useAuth } from "../contexts/AuthContext";
import { useProjectsData } from "../hooks/useProjectsData";

import { BsJournalPlus } from "react-icons/bs";
import ProjectModal from "../components/project/ProjectModal";
import type { CreateProject, Project, UpdateProject } from "../types/project";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const {
    projects,
    isLoading,
    error,
    addProjectMutation,
    updateProjectMutation,
    removeProjectMutation,
  } = useProjectsData();

  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<Project | null>();

  if (isLoading) {
    return (
      <div className="m-10 text-center text-2xl">Loading your projects.</div>
    );
  }

  const openModal = (project?: Project) => {
    setOpen(true);
    setProject(project);
  };

  const errorMessage =
    error instanceof Error ? error.message : error ? String(error) : null;

  return (
    <div className="m-10 mx-auto px-20 text-2xl">
      <h2>Hello, {user?.first_name}</h2>
      <p>Your organization is {user?.tenant_name}</p>

      <div className="fixed top-20 right-8 z-50 space-y-2">
        {errorMessage && <Toast message={errorMessage} type="error" />}
      </div>

      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        project={project}
        modalType={project ? "Update" : "Create"}
        mutation={
          project
            ? (payload) =>
                updateProjectMutation.mutateAsync(payload as UpdateProject)
            : (payload) =>
                addProjectMutation.mutateAsync(payload as CreateProject)
        }
      />

      {projects?.length === 0 ? (
        <div className="text-center">
          <p className="mt-10 text-2xl">You don't have projects yet</p>
          {user?.is_admin ? (
            <button
              onClick={() => openModal()}
              className="bg-pink my-5 inline-flex items-center rounded border border-transparent px-20 py-4 text-base leading-5 font-medium text-white shadow-xs"
            >
              <BsJournalPlus className="mr-2" />
              Add Project
            </button>
          ) : null}
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap justify-between">
            <h4 className="my-5">Projects</h4>
            {user?.is_admin ? (
              <button
                onClick={() => setOpen(true)}
                className="bg-pink my-5 inline-flex items-center rounded border border-transparent px-5 py-2 text-sm leading-5 font-medium text-white shadow-xs"
              >
                <BsJournalPlus className="mr-2 text-sm" />
                Add Project
              </button>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-lg text-xl shadow-lg">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-white text-left font-bold text-gray-600">
                  <th className="w-1/8 border-r border-gray-200 px-6 py-4">
                    Title
                  </th>
                  <th className="w-2/8 border-r border-gray-200 px-6 py-4">
                    Details
                  </th>
                  <th className="w-2/8 border-r border-gray-200 px-6 py-4">
                    Expected completion Date
                  </th>
                  <th className="w-2/8 border-r border-gray-200 px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-grey">
                {projects?.map((project) => (
                  <tr
                    key={project.id}
                    className="odd:bg-gray-100 even:bg-white"
                  >
                    <td className="border border-gray-200 px-6 py-4">
                      <NavLink to={`/project/${project.id}`}>
                        <span className="text-blue-700"> {project.title}</span>
                      </NavLink>
                    </td>
                    <td className="truncate border border-gray-200 px-6 py-4">
                      {project.details}
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      {project.expected_completion_date}
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <button
                        onClick={() => openModal(project)}
                        className="bg-pink mr-4 inline-block rounded px-4 py-2 text-center text-white"
                      >
                        Update
                      </button>

                      <button
                        onClick={() =>
                          removeProjectMutation.mutateAsync(project.id)
                        }
                        className="bg-pink inline-block rounded px-4 py-2 text-center text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
