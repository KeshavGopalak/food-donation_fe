// @/types/AdminTypes.ts
export const ROLE_STYLES: Record<string, string> = {
  Donor: "bg-slate-100 text-slate-600",
  Volunteer: "bg-sky-50 text-sky-700",
};

export const STATUS_STYLES: Record<string, string> = {
  Verified: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
};
type Role = keyof typeof ROLE_STYLES;
type Status = keyof typeof STATUS_STYLES;
export interface Registration {
  name: string;
  email: string;
  avatar: string;
  org: string;
  date: string;
  role: Role;
  status: Status;
}