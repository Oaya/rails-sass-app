import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Toast from "../components/ui/Toast";
import InputField from "../components/ui/inputField";
import type { InviteUser } from "../types/user";
import { useAuth } from "../contexts/AuthContext";

const AcceptInvite = () => {
  const [searchParams] = useSearchParams();
  const { acceptInvite } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const tenantName = searchParams.get("tenant");
  const navigate = useNavigate();

  const handleCreatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const data = Object.fromEntries(formData.entries());

      if (data.password !== data.password_confirmation) {
        setError("Password and Confirm Password has to match");
        setIsSubmitting(false);
        return;
      }

      const invitationToken = searchParams.get("invitation_token");

      if (!invitationToken) {
        setError(
          "Invalid invitation link. Ask admin user to resend invitation email",
        );
        return;
      }

      const res = await acceptInvite({
        ...data,
        invitation_token: invitationToken,
      } as InviteUser);

      if (res.data.message) {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

      console.log(res);
    } catch (err) {
      setMessage(null);
      setError((err as Error).message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="m-10 mx-auto w-150 text-2xl">
      <h2 className="pb-4 text-center text-5xl">
        You are invited to {tenantName}
      </h2>

      <div className="fixed top-20 right-8 z-50 space-y-2">
        {error && <Toast message={error} type="error" />}
        {message && <Toast message={message} type="success" />}
      </div>

      <form onSubmit={handleCreatePassword}>
        <InputField
          label="Password"
          name="password"
          type="password"
          onChange={() => setError(null)}
          required
        />

        <InputField
          label="Confirm Password"
          name="password_confirmation"
          type="password"
          onChange={() => setError(null)}
          required
        />

        <button disabled={isSubmitting} type="submit" className="btn-primary">
          Create Password
        </button>
      </form>
    </div>
  );
};

export default AcceptInvite;
