import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/inputField";
import Toast from "../components/ui/Toast";
import { inviteMember } from "../services/users";
import type { AddMemberUser } from "../types/user";
import { useAuth } from "../contexts/AuthContext";

const AddMember = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    try {
      const res = await inviteMember({
        ...data,
        tenant_id: user?.tenant_id,
      } as AddMemberUser);
      console.log("res", res);

      if (res.status === 201) {
        setMessage(`Invitation Email was sent to ${res.data.email}`);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
      setIsSubmitting(false);
    } catch (err) {
      setError((err as Error).message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="m-10 mx-auto w-150 text-2xl">
      <h2 className="pb-4 text-center text-5xl">New Member</h2>

      <div className="fixed top-20 right-8 z-50 space-y-2">
        {error && <Toast message={error} type="error" />}
        {message && <Toast message={message} type="success" />}
      </div>

      <form onSubmit={handleInvite}>
        <InputField
          label="Email"
          name="email"
          type="email"
          onChange={() => setError(null)}
          required
        />

        <InputField
          label="First Name"
          name="first_name"
          onChange={() => setError(null)}
          required
        />

        <InputField
          label="Last Name"
          name="last_name"
          onChange={() => setError(null)}
          required
        />

        <button disabled={isSubmitting} type="submit" className="btn-primary">
          Create user and Invite
        </button>
      </form>
    </div>
  );
};

export default AddMember;
