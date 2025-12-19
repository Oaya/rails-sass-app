import { useState } from "react";
import Popup from "reactjs-popup";

import DatePicker from "react-datepicker";
import { AiOutlineClose } from "react-icons/ai";

import { createProjectRequest } from "../services/projects";
import type { CreateProject } from "../types/project";
import Toast from "./ui/Toast";
import InputField from "./ui/inputField";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateProjectModal({ open, onClose }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const createProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    if (selectedDate) {
      try {
        const res = await createProjectRequest({
          ...data,
          expected_completion_date: selectedDate.toISOString().slice(0, 10),
        } as CreateProject);

        if (res.success) {
          setMessage("Project was created");
          handleClose();
        }
      } catch (err) {
        setError((err as Error).message);
        setIsSubmitting(false);
      }
    } else {
      return;
    }
  };

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const resetFormState = () => {
    setError(null);
    setMessage(null);
    setIsSubmitting(false);
    setSelectedDate(null);
  };

  const handleOpen = () => {
    resetFormState();
  };

  const handleClose = () => {
    resetFormState();
    onClose();
  };

  return (
    <Popup
      open={open}
      modal
      onOpen={handleOpen}
      onClose={handleClose}
      className="rounded"
    >
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
          <h3 className="mb-3">Create Project</h3>
          <form onSubmit={createProject}>
            <InputField
              label="Title"
              name="title"
              onChange={() => setError(null)}
              required
            />
            <InputField
              label="Details"
              name="details"
              onChange={() => setError(null)}
              required
            />

            <label className="block text-lg font-bold">
              Expected completion date
            </label>
            <DatePicker
              className="mb-2 w-150 rounded border border-gray-300 bg-white px-6 py-3 shadow-md"
              selected={selectedDate}
              onChange={handleChange}
              required
            />

            <button
              disabled={isSubmitting}
              type="submit"
              className="btn-primary"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Popup>
  );
}
