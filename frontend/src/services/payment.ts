import axios from "axios";
import type { SignupUser } from "../types/auth";

export async function startCheckout(data: SignupUser) {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/payments/checkout`,
    { ...data },
    { headers: { Accept: "application/json" } },
  );

  return res.data;
}
