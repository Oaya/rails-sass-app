import { Routes, BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages//Login";
import Header from "./components/layout/Header";
import Signup from "./pages/Signup";
import EmailConfirmed from "./pages/EmailConfirm";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="email-confirmed" element={<EmailConfirmed />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
