type Role = "Donor" | "Volunteer" | "Shelter";
type Status = "Active" | "Pending" | "Inactive";
export const ROLE_STYLES = {
  Donor: "bg-amber-50 text-amber-700",
  Volunteer: "bg-emerald-50 text-emerald-700",
  Shelter: "bg-sky-50 text-sky-700",
};

export const STATUS_STYLES = {
  Active: { dot: "bg-emerald-500", text: "text-emerald-600" },
  Pending: { dot: "bg-amber-500", text: "text-amber-600" },
  Inactive: { dot: "bg-slate-400", text: "text-slate-400" },
};
export interface User {
  name: string;
  email: string;
  avatar: string | null;
  initials?: string;
  org: string;
  joinDate: string;
  role: Role;
  status: Status;
}

