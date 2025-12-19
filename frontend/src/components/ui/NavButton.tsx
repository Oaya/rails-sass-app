import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  text: string;
  className?: string;
  children?: ReactNode;
};

const baseClass =
  "bg-pink inline-flex items-center rounded border border-transparent px-5 py-2 text-sm font-medium leading-5 text-white shadow-xs";

function NavButton({ to, text, className = "", children }: Props) {
  return (
    <NavLink to={to} className={`${baseClass} ${className}`}>
      <span className="inline-flex items-center gap-2">
        {children ? (
          <span className="shrink-0 leading-none">{children}</span>
        ) : null}
        <span className="whitespace-nowrap">{text}</span>
      </span>
    </NavLink>
  );
}

export default NavButton;
