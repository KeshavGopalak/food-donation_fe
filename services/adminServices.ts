const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface BackendAdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DonationHistoryItem {
  _id: string;
  foodType: string;
  itemName: string;
  quantity: string;
  expiryWindow: string;
  pickupLocation: string;
  photoUrl?: string | null;
  description: string;
  donorId: string;
  donorName: string;
  donorEmail: string;
  status: string;
  createdAt: string;
}

export async function getAllAdminUsers(): Promise<BackendAdminUser[]> {
  const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch admin users: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.users ?? [];
}

export async function getDonationsByDonor(donorId: string): Promise<DonationHistoryItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/donations/donor/${donorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch donor donations: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.donations ?? [];
}

export interface CreateAdminUserPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
  status?: string;
  verified?: boolean;
}

export async function createAdminUser(payload: CreateAdminUserPayload): Promise<BackendAdminUser> {
  const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create user: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.user;
}

export async function updateAdminUser(
  userId: string,
  payload: { status?: string; verified?: boolean; role?: string }
): Promise<BackendAdminUser> {
  const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update user: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.user;
}
