import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
};

const RequireAuth = ({ children }: Props) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }}></Navigate>;
  }

  return children;
};

export default RequireAuth;
