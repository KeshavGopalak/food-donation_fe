
import { ROLE_STYLES, STATUS_STYLES, User } from "@/types/AdminDashboard";

export const USERS: User[] = [
  {
    name: "Marcus Chen",
    email: "marcus.c@example.com",
    avatar: "https://i.pravatar.cc/64?img=51",
    org: "Green Valley Organics",
    joinDate: "Oct 12, 2023",
    role: "Donor",
    status: "Active",
  },
  {
    name: "Sarah Jenkins",
    email: "sarah.j@logistic.org",
    avatar: "https://i.pravatar.cc/64?img=47",
    org: "Independent",
    joinDate: "Jan 05, 2024",
    role: "Volunteer",
    status: "Active",
  },
  {
    name: "City Harvest Hub",
    email: "ops@cityharvest.org",
    avatar: null,
    initials: "CH",
    org: "City Harvest Foundation",
    joinDate: "Feb 22, 2024",
    role: "Shelter",
    status: "Pending",
  },
  {
    name: "Robert Kilgore",
    email: "r.kilgore@foundation.com",
    avatar: "https://i.pravatar.cc/64?img=13",
    org: "St. Jude Community",
    joinDate: "Dec 15, 2023",
    role: "Donor",
    status: "Inactive",
  },
];
