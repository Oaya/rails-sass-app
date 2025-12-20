import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import DatePicker from "react-datepicker";
import { AiOutlineClose } from "react-icons/ai";

import type { CreateProject, Project, UpdateProject } from "../types/project";
import Toast from "./ui/Toast";
import InputField from "./ui/inputField";

type Props = {
  open: boolean;
  onClose: () => void;
  modalType: "Create" | "Update";
  project?: Project | null;
  mutation: (payload: CreateProject | UpdateProject) => Promise<unknown>;
};

export default function CreateProjectModal({
  open,
  onClose,
  modalType,
  project,
  mutation,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!open) return;
    console.log(project);

    setError(null);
    setMessage(null);
    setIsSubmitting(false);

    if (modalType === "Update" && project?.expected_completion_date) {
      setSelectedDate(new Date(project.expected_completion_date));
    } else {
      setSelectedDate(null);
    }
  }, [open, modalType, project]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    try {
      if (modalType === "Create") {
        if (!selectedDate) throw new Error("Date is required");

        const res = await mutation({
          ...data,
          expected_completion_date: selectedDate.toISOString().slice(0, 10),
        } as CreateProject);

        if (res) {
          setMessage("Project was created");

          setTimeout(() => {
            handleClose();
          }, 3000);
        }
      } else {
        if (!project?.id) throw new Error("project Id is missing");

        const payload: UpdateProject = {
          ...data,
          id: project.id,
        };

        if (selectedDate)
          payload.expected_completion_date = selectedDate
            .toISOString()
            .slice(0, 10);
        const res = await mutation(payload);

        if (res) {
          setMessage("Project was updated");

          setTimeout(() => {
            handleClose();
          }, 3000);
        }
      }
    } catch (err) {
      setError((err as Error).message);
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setError(null);
    setMessage(null);
    setIsSubmitting(false);
  };

  const handleOpen = () => {
    resetFormState();
  };

  const handleClose = () => {
    resetFormState();
    setSelectedDate(null);
    onClose();
  };

  return (
    <Popup open={open} modal onOpen={handleOpen} onClose={handleClose}>
      <button
        type="button"
        onClick={() => {
          onClose();
        }}
        className="absolute top-4 right-4 rounded p-2 text-gray-500 hover:bg-gray-100"
      >
        <AiOutlineClose className="text-2xl" />
      </button>
      <div className="m-10 mx-auto w-150 text-2xl">
        <div className="fixed top-20 right-8 z-50 space-y-2">
          {error && <Toast message={error} type="error" />}
          {message && <Toast message={message} type="success" />}
        </div>

        <div className="mt-10">
          <h3 className="mb-3">{modalType} Project</h3>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Title"
              name="title"
              onChange={() => setError(null)}
              defaultValue={modalType === "Update" ? project?.title : ""}
              required={modalType === "Create"}
            />
            <InputField
              label="Details"
              name="details"
              onChange={() => setError(null)}
              defaultValue={modalType === "Update" ? project?.details : ""}
              required={modalType === "Create"}
            />

            <label className="block text-lg font-bold">
              Expected completion date
            </label>
            <DatePicker
              className="mb-2 w-150 rounded border border-gray-300 bg-white px-6 py-3 shadow-md"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              required={modalType === "Create"}
            />

            <button
              disabled={isSubmitting}
              type="submit"
              className="btn-primary"
            >
              {modalType}
            </button>
          </form>
        </div>
      </div>
    </Popup>
  );
}
