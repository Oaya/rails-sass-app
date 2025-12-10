export default function Header() {
  return (
    <div>
      <nav className="bg-pink text-c-gray fixed start-0 top-0 z-20 w-full">
        <div className="mx-auto flex flex-wrap items-center justify-between p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="text-heading text-c-gray self-center text-xl font-semibold whitespace-nowrap">
              SassApp
            </span>
          </a>
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="bg-mid-pink rounded-base mr-4 box-border rounded border border-transparent px-3 py-2 text-sm leading-5 font-medium shadow-xs focus:ring-4 focus:outline-none"
            >
              Log in
            </button>
            <button
              type="button"
              className="bg-mid-pink rounded-base mr-4 box-border rounded border border-transparent px-3 py-2 text-sm leading-5 font-medium shadow-xs focus:ring-4 focus:outline-none"
            >
              Sign up
            </button>
          </div>
          {/* <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="border-default rounded-base bg-neutral-secondary-soft md:bg-neutral-primary mt-4 flex flex-col border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
              <li>
                <a
                  href="#"
                  className="bg-brand md:text-fg-brand block rounded-sm px-3 py-2 text-white md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-heading hover:bg-neutral-tertiary md:hover:text-fg-brand block rounded px-3 py-2 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-heading hover:bg-neutral-tertiary md:hover:text-fg-brand block rounded px-3 py-2 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-heading hover:bg-neutral-tertiary md:hover:text-fg-brand block rounded px-3 py-2 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </div>
  );
}
