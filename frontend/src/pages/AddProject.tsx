import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import InputField from "../components/ui/inputField";
import Toast from "../components/ui/Toast";
import { createProjectRequest } from "../services/projects";
import type { Project } from "../types/project";

const AddProject = () => {
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
        } as Project);

        if (res.data.message) {
          setMessage(res.data.message);
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

  return (
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
          <button disabled={isSubmitting} type="submit" className="btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddProject;
