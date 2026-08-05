import { Registration } from "@/types/AdminTypes";

export const REGISTRATIONS: Registration[] = [
  {
    name: "Julianne Decca",
    email: "julianne.d@example.com",
    org: "Decca Bakeries Inc.",
    date: "Oct 24, 2024",
    role: "Donor",
    status: "Verified",
  },
  {
    name: "Marcus Kane",
    email: "m.kane@logistics.org",

    org: "City Food Bank",
    date: "Oct 23, 2024",
    role: "Volunteer",
    status: "Pending",
  },
  {
    name: "Sarah Linn",
    email: "sarah@freshmarket.com",

    org: "Fresh Market Co.",
    date: "Oct 22, 2024",
    role: "Donor",
    status: "Verified",
  },
];

export const WEEK_DATA = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 62 },
  { day: "Wed", value: 50 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 55 },
  { day: "Sat", value: 30 },
  { day: "Sun", value: 20 },
];