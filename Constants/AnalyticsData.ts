import { Utensils, HandHeart, Truck, Grid2x2 } from "lucide-react";

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  sub?: string;
  subClass?: string;
  icon: any;
  type?: "standard" | "progress";
  progressValue?: number;
}

export const STAT_CARDS: StatCardData[] = [
  {
    id: "meals",
    label: "Total Meals Saved",
    value: "124,592",
    sub: "↗ +12% from last month",
    subClass: "text-emerald-600",
    icon: Utensils,
  },
  {
    id: "donors",
    label: "Active Donors",
    value: "1,204",
    sub: "↗ 84 new this week",
    subClass: "text-emerald-600",
    icon: HandHeart,
  },
  {
    id: "deliveries",
    label: "Deliveries in Progress",
    value: "43",
    sub: "● Live Tracking",
    subClass: "text-sky-600",
    icon: Truck,
  },
  {
    id: "efficiency",
    label: "Area Efficiency",
    value: "94.2%",
    progressValue: 94.2,
    icon: Grid2x2,
    type: "progress",
  },
];