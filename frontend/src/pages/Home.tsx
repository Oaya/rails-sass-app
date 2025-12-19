import { useState } from "react";
import Toast from "../components/ui/Toast";
import { useAuth } from "../contexts/AuthContext";
import { useProjectData } from "../hooks/useProjectData";

import { BsJournalPlus } from "react-icons/bs";
import CreateProjectModal from "../components/CreateProjectModal";

const Home = () => {
  const { user } = useAuth();
  const { projects, isLoading, error, addProjectMutation } = useProjectData();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="m-10 text-center text-2xl">Loading your projects.</div>
    );
  }

  return (
    <div className="m-10 mx-auto px-20 text-2xl">
      <h2>Hello, {user?.first_name}</h2>
      <p>Your organization is {user?.tenant_name}</p>

      <div className="fixed top-20 right-8 z-50 space-y-2">
        {error && <Toast message={error.message} type="error" />}
      </div>

      <CreateProjectModal
        open={open}
        onClose={() => setOpen(false)}
        mutation={(payload) => addProjectMutation.mutateAsync(payload)}
      />

      {projects?.length === 0 ? (
        <div className="text-center">
          <p className="mt-10 text-2xl">You don't have projects yet</p>
          {user?.is_admin ? (
            <button
              onClick={() => setOpen(true)}
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
                  <th className="w-1/6 border-r border-gray-200 px-6 py-4">
                    Title
                  </th>
                  <th className="w-2/6 border-r border-gray-200 px-6 py-4">
                    Details
                  </th>
                  <th className="w-2/6 border-r border-gray-200 px-6 py-4">
                    Expected completion Date
                  </th>
                  <th className="w-2/6 border-r border-gray-200 px-6 py-4">
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
                      {project.title}
                    </td>
                    <td className="truncate border border-gray-200 px-6 py-4">
                      {project.details}
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      {project.expected_completion_date}
                    </td>
                    {/* <td className="border border-gray-200 px-6 py-4">
                    {project.isTracking ? (
                      <span className="inline-block rounded bg-gray-300 px-4 py-2 text-center text-white">
                        Already Tracking
                      </span>
                    ) : (
                      <button
                        onClick={() => addStock(stock.ticker)}
                        className="bg-c-purple inline-block rounded px-4 py-2 text-center text-white"
                      >
                        Track
                      </button>
                    )}
                  </td> */}
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
