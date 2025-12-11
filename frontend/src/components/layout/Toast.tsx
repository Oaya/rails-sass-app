const Toast = () => {
  return (
    <div>
      <div
        id="toast-success"
        className="text-body bg-neutral-primary-soft rounded-base border-default flex w-full max-w-sm items-center border p-4 shadow-xs"
        role="alert"
      >
        <div className="text-fg-success bg-success-soft inline-flex h-7 w-7 shrink-0 items-center justify-center rounded">
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">Item moved successfully.</div>
        <button
          type="button"
          className="text-body hover:text-heading hover:bg-neutral-secondary-medium focus:ring-neutral-tertiary ms-auto box-border flex h-8 w-8 items-center justify-center rounded border border-transparent bg-transparent text-sm leading-5 font-medium focus:ring-4 focus:outline-none"
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>
      <div
        id="toast-danger"
        className="text-body bg-neutral-primary-soft rounded-base border-default flex w-full max-w-sm items-center border p-4 shadow-xs"
        role="alert"
      >
        <div className="text-fg-danger bg-danger-soft inline-flex h-7 w-7 shrink-0 items-center justify-center rounded">
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">Item has been deleted.</div>
        <button
          type="button"
          className="text-body hover:text-heading hover:bg-neutral-secondary-medium focus:ring-neutral-tertiary ms-auto box-border flex h-8 w-8 items-center justify-center rounded border border-transparent bg-transparent text-sm leading-5 font-medium focus:ring-4 focus:outline-none"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>
      <div
        id="toast-warning"
        className="text-body bg-neutral-primary-soft rounded-base border-default flex w-full max-w-sm items-center border p-4 shadow-xs"
        role="alert"
      >
        <div className="text-fg-warning bg-warning-soft inline-flex h-7 w-7 shrink-0 items-center justify-center rounded">
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="sr-only">Warning icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">
          Improve password difficulty.
        </div>
        <button
          type="button"
          className="text-body hover:text-heading hover:bg-neutral-secondary-medium focus:ring-neutral-tertiary ms-auto box-border flex h-8 w-8 items-center justify-center rounded border border-transparent bg-transparent text-sm leading-5 font-medium focus:ring-4 focus:outline-none"
          data-dismiss-target="#toast-warning"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
