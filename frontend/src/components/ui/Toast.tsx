import { useState } from "react";

type Props = {
  message: string;
  type: "success" | "error";
};

const Toast = ({ message, type }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  const colorClasses =
    type === "error"
      ? "bg-red-200 text-red-700"
      : "bg-green-200 text-green-700";

  const handleToggle = () => setOpen(false);

  return (
    <div className="flex h-20 items-center">
      <div
        className={`text-body flex w-100 items-center rounded p-2 shadow-xs transition-opacity duration-200 ${colorClasses} ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="alert"
      >
        <div className="m-2 text-sm font-normal">{message}</div>

        <button
          onClick={handleToggle}
          type="button"
          className="ms-auto flex h-8 w-8 items-center justify-center rounded focus:outline-none"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
