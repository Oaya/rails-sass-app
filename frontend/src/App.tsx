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

function Root() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // or spinner
  return user ? <Home /> : <Welcome />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="email-confirmed" element={<EmailConfirmed />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="accept-invite" element={<AcceptInvite />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
