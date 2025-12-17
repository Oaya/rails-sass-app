import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  text: string;
  children?: ReactNode;
};

function NavButton({ to, text, children }: Props) {
  return (
    <NavLink
      to={to}
      className="bg-pink mr-4 inline-flex items-center gap-2 rounded border border-transparent px-5 py-2 text-sm leading-5 font-medium text-white shadow-xs"
    >
      {children}
      <span>{text}</span>
    </NavLink>
  );
}

export default NavButton;
