import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const EmailConfirmed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { confirmEmail } = useAuth();

  useEffect(() => {
    if (hasConfirmed) return;

    const confirmSignIn = async () => {
      try {
        const confirmationToken = searchParams.get("confirmation_token");
        const errorMessage = searchParams.get("error");

        if (!confirmationToken) {
          setError("Invalid confirmation link. Missing confirmation token.");
          return;
        }

        if (errorMessage) {
          setMessage(null);
          setError(errorMessage);
        }

        const res = await confirmEmail(confirmationToken);

        setMessage(
          res.data.message || "Email confirmed and signed in successfully.",
        );
        setHasConfirmed(true);

        setTimeout(() => {
          navigate("/");
        }, 10000);
      } catch (err) {
        setMessage(null);
        setError((err as Error).message);
        setHasConfirmed(true);
        setTimeout(() => {
          navigate("/login");
        }, 10000);
      }
    };

    confirmSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, navigate, hasConfirmed]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-6 text-center text-4xl font-bold">
          Email Confirmation
        </h1>

        {error && <p className="text-center text-2xl text-red-600">{error}</p>}

        {message && (
          <p className="text-center text-2xl text-green-600">
            {message}
            <br />
            <span className="mt-2 block text-base text-gray-600">
              Redirecting you shortly...
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmed;
