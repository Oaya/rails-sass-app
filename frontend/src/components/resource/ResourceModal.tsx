import { useState } from "react";
import Popup from "reactjs-popup";

import { AiOutlineClose } from "react-icons/ai";

import type { Resource } from "../../types/project";
import Toast from "../ui/Toast";
import InputField from "../ui/inputField";
import type { CreateResource } from "../../types/resource";

type Props = {
  open: boolean;
  onClose: () => void;
  resource?: Resource | null;
  projectId: string;
  mutation: (payload: CreateResource) => Promise<unknown>;
};

export default function CreateResourceModal({
  open,
  onClose,
  projectId,
  mutation,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = String(formData.get("title") ?? "");
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setError("Please select a file");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await mutation({
        projectId,
        title,
        file: file,
        onProgress: (p) => console.log("upload %", p),
      });

      if (res) {
        setMessage("Project was created");

        setTimeout(() => {
          handleClose();
        }, 3000);
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
          <h3 className="mb-3">Create Resource</h3>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Title"
              name="title"
              onChange={() => setError(null)}
              required
            />
            <InputField
              label="File"
              name="file"
              type="file"
              onChange={() => setError(null)}
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
