import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmAndSignIn } from "../services/auth";

// type ConfirmAndSignInResponse = {
//   message: string;
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     first_name: string;
//     last_name: string;
//     is_admin: boolean;
//     tenant?: {
//       id: string;
//       name: string;
//       plan: string;
//     } | null;
//   };
// };

const EmailConfirmed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const confirmSignIn = async () => {
      try {
        setMessage("Confirming your email...");
        const confirmationToken = searchParams.get("confirmation_token");
        const errorMessage = searchParams.get("error");

        if (!confirmationToken) {
          setError("Invalid confirmation link. Missing confirmation token.");
          return;
        }

        if (errorMessage) {
          setError(errorMessage);
        }

        const res = await confirmAndSignIn(confirmationToken);

        console.log(res);

        if (res.success && res.data) {
          // store JWT
          localStorage.setItem("jwt", res.data.token);

          setMessage(
            res.data.message || "Email confirmed and signed in successfully.",
          );

          setTimeout(() => {
            navigate("/"); // or "/dashboard"
          }, 2000);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    confirmSignIn();
  }, [searchParams, navigate]);

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
