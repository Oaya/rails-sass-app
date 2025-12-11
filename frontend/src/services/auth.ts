import type { LoginUser, User } from "../contexts/AuthContext";

export async function loginRequest(user: LoginUser) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        email: user.email,
        password: user.password,
      },
    }),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(`Login failed: ${data.error}`);
  }

  //set the token in localStorage
  const authHeader = res.headers.get("Authorization");

  const token = authHeader?.split(" ")[1];

  if (!token) throw new Error("No token Error");

  localStorage.setItem("jwt", token);

  const loggedInUser: User = {
    id: data.user.id,
    email: data.user.email,
    first_name: data.user.first_name,
    last_name: data.user.last_name,
    is_admin: data.user.is_admin,
    tenant_id: data.user.tenant.id,
    plan: data.user.tenant.plan,
  };

  return loggedInUser;
}
