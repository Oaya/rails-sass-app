import { useParams } from "react-router-dom";
import { useState } from "react";
import Popup from "reactjs-popup";

import { useAuth } from "../../contexts/AuthContext";
import { useProjectData } from "../../hooks/useProjectData";

import { BsJournalPlus } from "react-icons/bs";
import ResourceModal from "../resource/ResourceModal";
import { getResourceDownloadUrl } from "../../services/resources";

const ProjectDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  // preview modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewLoadingId, setPreviewLoadingId] = useState<number | null>(null);

  const projectId = id ?? null;

  const { project, isLoading, error, addResourceMutation } = useProjectData(
    projectId!,
  );

  const resources = project?.resources ?? [];

  const handlePreview = async (resourceId: number) => {
    try {
      setPreviewError(null);
      setPreviewLoadingId(resourceId);

      const url = await getResourceDownloadUrl(resourceId);

      setPreviewUrl(url);
      setPreviewOpen(true);
    } catch (e) {
      setPreviewError((e as Error).message);
    } finally {
      setPreviewLoadingId(null);
    }
  };

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
          <ResourceModal
            key={open ? "open" : "closed"}
            open={open}
            onClose={() => setOpen(false)}
            projectId={projectId!}
            mutation={(payload) => addResourceMutation.mutateAsync(payload)}
          />

          <Popup
            open={previewOpen}
            modal
            onClose={() => setPreviewOpen(false)}
            className="resource-preview-popup"
          >
            <div className="resource-preview-container">
              {previewError && (
                <p className="mb-4 text-red-600">{previewError}</p>
              )}

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Resource preview"
                  className="resource-preview-image"
                />
              )}
            </div>
          </Popup>

          <div>
            <h2 className="text-3xl">Title: {project.title}</h2>
            <p className="mt-4">Details: {project.details}</p>
            <p className="mt-2">
              Expected Completion Date: {project.expected_completion_date}
            </p>
          </div>

          <div>
            <div className="flex flex-wrap justify-between">
              <h4 className="my-5">Resources</h4>
              {user?.is_admin ? (
                <button
                  onClick={() => setOpen(true)}
                  className="bg-pink my-5 inline-flex items-center rounded border border-transparent px-5 py-2 text-sm leading-5 font-medium text-white shadow-xs"
                >
                  <BsJournalPlus className="mr-2 text-sm" />
                  Add Resource
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
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-grey">
                  {resources.length > 0 &&
                    resources.map((resource) => (
                      <tr
                        key={resource.id}
                        className="odd:bg-gray-100 even:bg-white"
                      >
                        <td className="border border-gray-200 px-6 py-4">
                          <span>{resource.title}</span>
                        </td>

                        <td className="border border-gray-200 px-6 py-4">
                          <button
                            onClick={() => handlePreview(resource.id)}
                            disabled={previewLoadingId === resource.id}
                            className="bg-pink mr-4 inline-block rounded px-4 py-2 text-center text-white disabled:opacity-50"
                          >
                            {previewLoadingId === resource.id
                              ? "Loading..."
                              : "Preview"}
                          </button>

                          <button className="bg-pink inline-block rounded px-4 py-2 text-center text-white">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsView;
