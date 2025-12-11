import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { SignupUser } from "../types/auth";

const Signup = () => {
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirm_password) {
      setError("Password and Confirm password should match");
      return;
    }

    try {
      const res = await signup(data as SignupUser);

      console.log("res", res);

      if (res.message) {
        setMessage(res.message);
      }
    } catch (err) {
      console.log(err);
      setError((err as Error).message);
    }
  };

  const clearState = () => {
    setError(null);
    setMessage(null);
  };

  return (
    <div className="m-10 mx-auto w-200 text-2xl">
      <h2 className="pb-4 text-center text-5xl">Sign up</h2>

      {error && <p className="my-4 text-left text-2xl text-red-500">{error}</p>}
      {message && (
        <p className="my-4 text-left text-2xl text-green-500">{message}</p>
      )}

      <form onSubmit={handleSignup}>
        <div className="mb-5">
          <label className="mb-2 block font-bold">Email</label>
          <input
            type="email"
            name="email"
            onChange={clearState}
            required
            className="mb-5 w-full rounded border border-gray-300 bg-white px-8 py-5 shadow-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="group relative z-0 mb-5 w-full">
            <label className="mb-2 block font-bold">First Name</label>
            <input
              type="text"
              name="first_name"
              onChange={clearState}
              required
              className="mb-5 w-full rounded border border-gray-300 bg-white p-3 px-8 py-5 shadow-md"
            />
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="mb-2 block font-bold">Last Name</label>
            <input
              type="text"
              name="last_name"
              onChange={clearState}
              required
              className="mb-5 w-full rounded border border-gray-300 bg-white p-3 px-8 py-5 shadow-md"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block font-bold">Password</label>
          <input
            type="password"
            name="password"
            onChange={clearState}
            required
            className="mb-5 w-full rounded border border-gray-300 bg-white px-8 py-5 shadow-md"
          />
        </div>
        <div className="mb-5">
          <label className="mb-2 block font-bold">Password confirmation</label>
          <input
            type="password"
            name="confirm_password"
            onChange={clearState}
            required
            className="mb-5 w-full rounded border border-gray-300 bg-white px-8 py-5 shadow-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="group relative z-0 mb-5 w-full">
            <label className="mb-2 block font-bold">Organization</label>
            <input
              type="text"
              name="tenant"
              onChange={clearState}
              required
              className="mb-5 w-full rounded border border-gray-300 bg-white p-3 px-8 py-5 shadow-md"
            />
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <label className="mb-2 block font-bold">Plan</label>
            <select
              name="plan"
              className="mb-5 w-full rounded border border-gray-300 bg-white p-3 px-8 py-5 shadow-md"
            >
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-pink w-full rounded px-8 py-5 text-center text-white"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
