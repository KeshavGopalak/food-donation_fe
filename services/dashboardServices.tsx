import { NearbyDonation } from "@/types/dashboardTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// --- API Helper Functions ---
export const fetchNearbyDonations = async (): Promise<NearbyDonation[]> => {
  const response = await fetch(`${API_URL}/api/donations/nearby`);
  if (!response.ok) throw new Error("Failed to fetch nearby food");
  const data = await response.json();
  return data.donations || [];
};
export const createDonation = async (payload: any) => {
  const response = await fetch(`${API_URL}/api/donations/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => null);
    throw new Error(errData?.message || "Failed to create donation");
  }

  return response.json();
};