import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import InputField from "../components/ui/inputField";
import Toast from "../components/ui/Toast";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    if (data.email) {
      try {
        const res = await resetPassword(data.email as string);
        if (res.data.message) {
          setMessage(res.data.message);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  return (
    <div className="m-10 mx-auto w-150 text-2xl">
      <h2 className="pb-4 text-center text-5xl">Reset password</h2>
      <div className="fixed top-20 right-8 z-50 space-y-2">
        {error && <Toast message={error} type="error" />}
        {message && <Toast message={message} type="success" />}
      </div>

      <form onSubmit={handlePasswordReset}>
        <InputField
          label="Email"
          name="email"
          onChange={() => setError(null)}
          required
        />

        <button
          type="submit"
          className="bg-pink mt-2 mb-2 w-full rounded px-6 py-3 text-center text-white"
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
