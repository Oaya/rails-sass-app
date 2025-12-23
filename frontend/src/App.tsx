import { Routes, BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages//Login";
import Header from "./components/layout/Header";
import Signup from "./pages/Signup";
import EmailConfirmed from "./pages/EmailConfirm";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { useAuth } from "./contexts/AuthContext";
import Welcome from "./pages/Welcome";
import AddMember from "./pages/AddMember";
import AcceptInvite from "./pages/AcceptInvite";
import RequireAuth from "./components/RequireAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectDetailsView from "./components/project/ProjectDetailsView";

const queryClient = new QueryClient();

function Root() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // or spinner
  return user ? <Home /> : <Welcome />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="email-confirmed" element={<EmailConfirmed />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="accept-invite" element={<AcceptInvite />} />
          <Route
            path="add-member"
            element={
              <RequireAuth>
                <AddMember />
              </RequireAuth>
            }
          />
          <Route
            path="project/:id"
            element={
              <RequireAuth>
                <ProjectDetailsView />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
