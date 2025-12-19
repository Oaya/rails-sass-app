import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { BsFillPeopleFill } from "react-icons/bs";
import NavButton from "../ui/NavButton";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav className="bg-mid-pink sticky start-0 top-0 z-20 w-full">
      <div className="mx-auto flex flex-wrap items-center justify-between px-20 py-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <NavLink to="/">
            <span className="text-heading text-c-gray self-center text-xl font-semibold whitespace-nowrap">
              SassApp
            </span>
          </NavLink>

          {user?.is_admin && (
            <div>
              <NavButton to="add-member" text="Add Member">
                <BsFillPeopleFill className="text-base" />
              </NavButton>
            </div>
          )}
        </div>

        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-pink rounded-base box-border rounded border border-transparent px-5 py-2 text-sm leading-5 font-medium text-white shadow-xs"
            >
              Log out
            </button>
          ) : (
            <div>
              <NavButton to="login" text="Log In" className="mr-4" />
              <NavButton to="signup" text="Sign up" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
