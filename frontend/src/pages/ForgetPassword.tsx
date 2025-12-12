import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import InputField from "../components/ui/inputField";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    if (data.email) {
      try {
        await resetPassword(data.email as string);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  return (
    <div className="m-10 mx-auto w-150 text-2xl">
      <h2 className="pb-4 text-center text-5xl">Reset password</h2>
      {error && (
        <p className="m-4 text-center text-2xl text-red-500">{error}</p>
      )}

      <form onSubmit={handlePasswordReset}>
        <InputField
          label="Email"
          name="email"
          onChange={() => setError(null)}
          required
        />

        <button
          type="submit"
          className="bg-pink mb-2 w-full rounded px-6 py-3 text-center text-white"
        >
          Reset Password
        </button>
      </form>

      <div className="flex flex-col text-xl">
        <NavLink to="/login" className="text-blue-600">
          Go back to Login page
        </NavLink>
      </div>
    </div>
  );
};
export default ForgetPassword;
