import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav className="bg-pink text-c-gray sticky start-0 top-0 z-20 w-full">
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
            <NavLink
              to="login"
              className="bg-mid-pink rounded-base mr-4 box-border rounded border border-transparent px-5 py-2 text-sm leading-5 font-medium shadow-xs focus:ring-4 focus:outline-none"
            >
              Log in
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
