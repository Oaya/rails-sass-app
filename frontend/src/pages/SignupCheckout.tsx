import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutProvider,
  PaymentElement,
} from "@stripe/react-stripe-js/checkout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function SignupCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;
  console.log(state);

  if (!state?.client_secret) {
    return (
      <div className="m-10 text-center text-2xl">
        Missing checkout session. Please go back to sign up.
        <div className="mt-4">
          <button className="btn-primary" onClick={() => navigate("/signup")}>
            Back to signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="m-10 mx-auto w-[900px] text-2xl">
      <h2 className="pb-4 text-center text-4xl">Checkout</h2>

      <CheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: state.client_secret }}
      >
        <form className="rounded bg-white p-6 shadow">
          <PaymentElement />
        </form>
      </CheckoutProvider>
    </div>
  );
}
