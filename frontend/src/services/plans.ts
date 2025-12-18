import axios from "axios";

export async function getPlans(): Promise<ApiResponse> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/plans`, {
      headers: {
        Accept: "application/json",
      },
    });

    return { success: true, data: res.data };
  } catch (err: any) {
    throw new Error(`Error: ${err.response.data.error}`);
  }
}
