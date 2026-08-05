export interface BackendDonation {
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