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

export const updateDonationStatus = async (donationId: string, status: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/donations/${donationId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update donation status");
    }

    const updatedDonation = await response.json();
    console.log("Donation status updated:", updatedDonation);
    return true;
  } catch (error) {
    console.error("Error updating donation status:", error);
    return false;
  }
};
export const fetchPendingPickupRequests = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/donations/search/status/Pending%20Pickup`);
    if (!response.ok) {
      throw new Error("Failed to fetch pending pickup requests");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching pending pickup requests:", error);
    return [];
  }
};