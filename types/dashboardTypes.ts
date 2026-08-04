
export interface NearbyDonation {
  _id: string;
  foodType: string;
  itemName: string;
  quantity: string;
  donorName: string;
  status: string;
  createdAt: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}
