import type { LoginUser } from "../contexts/AuthContext";

export async function loginRequest(user: LoginUser) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        email: user.email,
        password: user.password,
      },
    }),
  });
}
