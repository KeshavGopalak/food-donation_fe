import { BackendDonation } from "@/types/volunteerTypes";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";


export async function getDonations(): Promise<BackendDonation[]> {
  const response = await fetch(`${API_BASE_URL}/api/donations/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch donations: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.donations ?? [];
}

export async function getDonationsByDonor(donorId: string): Promise<BackendDonation[]> {
  const response = await fetch(`${API_BASE_URL}/api/donations/donor/${donorId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch your donations: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.donations ?? [];
}