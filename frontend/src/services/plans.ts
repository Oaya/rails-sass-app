export async function getPlans() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/plans`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  console.log(data);
  return data;
}
