export type StoredUser = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  verified?: boolean;
  createdAt?: string;
  avatarUrl?: string | null;
};

export type EditableField = "name" | "email" | "avatar";