"use client";
import { Award, Bell, Clock, LayoutGrid, LogOut, MapPin, MoreVertical, Route, Search, Soup, Star, TrendingUp, Truck, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPendingPickupRequests } from "@/services/volunteerServices";
import { queryKeys } from "@/services/queries/queryKeys";
const weeklyActivity = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 60 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 68 },
  { day: "Sun", value: 40 },
];


 

export default function VolDashboard() {
  const router = useRouter();
  const [isChecking, setIsChecking] = React.useState(true);
  const { data: pendingPickupRequests = [] } = useQuery({
    queryKey: queryKeys.donations.pendingPickup,
    queryFn: async () => {
      const requests = await fetchPendingPickupRequests();
      return requests.donations || [];
    },
  });

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user?.role !== "volunteer") {
        router.replace(user?.role === "admin" ? "/admin-dashboard" : "/userdashboard/dashboard");
        return;
      }
      setIsChecking(false);
    } catch {
      router.replace("/login");
      return;
    }

  }, [router]);
  if (isChecking) return <div className="min-h-screen bg-gray-50" />;
  return (


    <div className="min-h-screen bg-sky-50/60 flex font-sans text-slate-900">
     

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        

        {/* Content */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm shadow-sky-950/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  +12%
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {pendingPickupRequests.length > 0 ? pendingPickupRequests.length : 0}
              </div>
              <div className="text-xs text-gray-400 mt-1">Total Deliveries</div>
            </div>

            <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm shadow-sky-950/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Route className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Last 30 days</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">1,240 km</div>
              <div className="text-xs text-gray-400 mt-1">Total Distance</div>
            </div>

            <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm shadow-sky-950/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Soup className="w-4 h-4 text-purple-600" />
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full">
                  Critical Impact
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">3,450</div>
              <div className="text-xs text-gray-400 mt-1">Meals Saved</div>
            </div>

            <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm shadow-sky-950/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Star className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">Redeem</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">12,850</div>
              <div className="text-xs text-gray-400 mt-1">Volunteer Points</div>
            </div>
          </div>

          {/* Analytics row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-sky-100 p-5 shadow-sm shadow-sky-950/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Impact Analytics</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Weekly delivery performance tracking</p>
                </div>
                <select className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-600 outline-none">
                  <option>Last 7 Days</option>
                </select>
              </div>
              <div className="flex items-end justify-between gap-3 h-36">
                {weeklyActivity.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full rounded-t-md bg-cyan-500/80"
                      style={{ height: `${d.value}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                {weeklyActivity.map((d) => (
                  <span key={d.day} className="flex-1 text-center">{d.day}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm shadow-sky-950/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-500 font-medium">Avg. Delivery Time</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  32.4 <span className="text-sm font-normal text-gray-400">minutes</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "70%" }} />
                </div>
                <div className="text-xs text-gray-400 mt-2">5% faster than last month</div>
              </div>

              <div className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm shadow-sky-950/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-sm text-gray-500 font-medium">Reliability Score</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">98.2%</div>
                <div className="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "98%" }} />
                </div>
                <div className="text-xs text-gray-400 mt-2">Elite Volunteer Status</div>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl border border-sky-100 shadow-sm shadow-sky-950/5">
            <div className="flex items-center justify-between p-5">
              <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
              <a href="#" className="text-sm text-emerald-600 font-medium hover:underline">View All History</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase border-y border-gray-100">
                    <th className="px-5 py-3 font-medium">Delivery ID</th>
                    <th className="px-5 py-3 font-medium">Pickup Point</th>
                    <th className="px-5 py-3 font-medium">Destination</th>
                    <th className="px-5 py-3 font-medium">Timestamp</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">#VL-9283</td>
                    <td className="px-5 py-4 text-sm text-gray-600">Green Grove Supermarket</td>
                    <td className="px-5 py-4 text-sm text-gray-600">City Food Bank</td>
                    <td className="px-5 py-4 text-sm text-gray-500">Today, 10:45 AM</td>
                    <td className="px-5 py-4">
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">Completed</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <MoreVertical className="w-4 h-4 text-gray-300 ml-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">#VL-9284</td>
                    <td className="px-5 py-4 text-sm text-gray-600">Boulangerie Patisserie</td>
                    <td className="px-5 py-4 text-sm text-gray-600">St. Jude's Shelter</td>
                    <td className="px-5 py-4 text-sm text-gray-500">Today, 02:15 PM</td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 w-fit bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        In Progress
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <MoreVertical className="w-4 h-4 text-gray-300 ml-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">#VL-9281</td>
                    <td className="px-5 py-4 text-sm text-gray-600">Organic Harvest Hub</td>
                    <td className="px-5 py-4 text-sm text-gray-600">Elderly Care Home</td>
                    <td className="px-5 py-4 text-sm text-gray-500">Yesterday, 04:30 PM</td>
                    <td className="px-5 py-4">
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">Completed</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <MoreVertical className="w-4 h-4 text-gray-300 ml-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">#VL-9279</td>
                    <td className="px-5 py-4 text-sm text-gray-600">Central Market Hall</td>
                    <td className="px-5 py-4 text-sm text-gray-600">Community Kitchen</td>
                    <td className="px-5 py-4 text-sm text-gray-500">Oct 24, 11:20 AM</td>
                    <td className="px-5 py-4">
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">Completed</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <MoreVertical className="w-4 h-4 text-gray-300 ml-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}