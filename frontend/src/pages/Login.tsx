import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { LoginUser } from "../types/auth";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    console.log(data);

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
    <div className="m-10">
      <h2 className="pb-4 text-center text-5xl">Log In</h2>
      {error && (
        <p className="m-4 text-center text-2xl text-red-500">{error}</p>
      )}

      <form onSubmit={handleLogin} className="mx-auto w-200 text-2xl">
        <div className="mb-5">
          <label className="mb-2 block font-bold">Email</label>
          <input
            type="email"
            name="email"
            onChange={() => setError(null)}
            required
            className="mb-5 w-full rounded border border-gray-300 bg-white px-8 py-5 shadow-md"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block font-bold">Password</label>
          <input
            type="password"
            name="password"
            onChange={() => setError(null)}
            required
            className="mb-5 w-full rounded border border-gray-300 bg-white px-8 py-5 shadow-md"
          />
        </div>

        <button
          type="submit"
          className="bg-pink w-full rounded px-8 py-5 text-center text-white"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
