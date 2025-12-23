import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import type { SignupUser } from "../types/auth";
import InputField from "../components/ui/inputField";
import Toast from "../components/ui/Toast";
import { startCheckout } from "../services/payment";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearState();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const plan = data.plan;

    if (data.password !== data.confirm_password) {
      setError("Password and Confirm password should match");
      setIsSubmitting(false);
      return;
    }

    try {
      if (plan === "free") {
        const res = await signup(data as SignupUser);
        if (res.message) {
          setMessage(res.message);
          // setTimeout(() => {
          //   navigate("/login");
          // }, 2000);
          return;
        }
      }

      //Paid plans -> stripe checkout

      const { client_secret } = await startCheckout(data as SignupUser);
      navigate("/signup/checkout", { state: { client_secret } });

      console.log(client_secret);
    } catch (err) {
      setError((err as Error).message);
      setIsSubmitting(false);
    }
  };

  const clearState = () => {
    setError(null);
    setMessage(null);
  };

  return (
    <div className="m-10 mx-auto w-150 text-2xl">
      <h2 className="pb-4 text-center text-5xl">Sign up</h2>

      <div className="fixed top-20 right-8 z-50 space-y-2">
        {error && <Toast message={error} type="error" />}
        {message && <Toast message={message} type="success" />}
      </div>

      <form onSubmit={handleSignup}>
        <InputField
          label="Email"
          name="email"
          type="email"
          onChange={clearState}
          required
        />

        <div className="grid grid-cols-2 gap-6">
          <div className="group relative z-0 w-full">
            <InputField
              label="First Name"
              name="first_name"
              onChange={clearState}
              required
            />
          </div>
          <div className="group relative z-0 w-full">
            <InputField
              label="Last Name"
              name="last_name"
              onChange={clearState}
              required
            />
          </div>
        </div>

        <InputField
          type="password"
          label="Password"
          name="password"
          onChange={clearState}
          required
        />

        <InputField
          type="password"
          label="Confirm Password"
          name="confirm_password"
          onChange={clearState}
          required
        />

        <div className="grid grid-cols-2 gap-6">
          <div className="group relative z-0 w-full">
            <InputField
              label="Organization"
              name="tenant"
              onChange={clearState}
              required
            />
          </div>
          <div className="group relative z-0 w-full">
            <label className="block text-lg font-bold">Plan</label>
            <select
              name="plan"
              className="mb-2 w-full rounded border border-gray-300 bg-white p-3 px-6 py-3 shadow-md"
            >
              <option value="free">Free</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        <button disabled={isSubmitting} type="submit" className="btn-primary">
          Sign up
        </button>

        <NavLink to="/login" className="text-xl text-blue-600">
          Already have an account?
        </NavLink>
      </form>
    </div>
  );
};

export default Signup;
