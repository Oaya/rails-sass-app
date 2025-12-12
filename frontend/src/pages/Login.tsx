import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { LoginUser } from "../types/auth";
import { NavLink } from "react-router-dom";
import InputField from "../components/ui/inputField";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    if (data.email && data.password) {
      try {
        await login(data as LoginUser);

        //TODO :redirect to user page?
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  return (
    <div className="m-10 mx-auto w-150 text-2xl">
      <h2 className="pb-4 text-center text-5xl">Log In</h2>
      <div>
        {error && (
          <p className="m-4 text-center text-2xl text-red-500">{error}</p>
        )}
      </div>

      <form onSubmit={handleLogin} className="">
        <InputField
          label="Email"
          name="email"
          onChange={() => setError(null)}
          required
        />

        <InputField
          label="password"
          name="password"
          type="password"
          onChange={() => setError(null)}
          required
        />

        <button
          type="submit"
          className="bg-pink mb-2 w-full rounded px-6 py-3 text-center text-white"
        >
          Log In
        </button>
      </form>

      <div className="flex flex-col text-xl">
        <NavLink to="/forget-password" className="text-blue-600">
          Forget Password?
        </NavLink>
        <NavLink to="/signup" className="text-blue-600">
          Don't have account yet?
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
