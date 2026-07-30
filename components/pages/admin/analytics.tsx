import { Utensils, HandHeart, Truck, Grid2x2, ChevronDown, MoreVertical } from "lucide-react";
import Layout from "./layout";
import { REGISTRATIONS, WEEK_DATA } from "@/Constants/AdminUsers";
import { ROLE_STYLES, STATUS_STYLES } from "@/types/AdminTypes";








export default function AnalyticsPage() {
  const maxValue = Math.max(...WEEK_DATA.map((d) => d.value));

  return (
    <Layout activePage="analytics" pageTitle="Analytics Dashboard">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Utensils className="w-4 h-4 text-emerald-700" />}
          label="Total Meals Saved"
          value="124,592"
          sub="↗ +12% from last month"
          subClass="text-emerald-600"
        />
        <StatCard
          icon={<HandHeart className="w-4 h-4 text-amber-700" />}
          label="Active Donors"
          value="1,204"
          sub="↗ 84 new this week"
          subClass="text-emerald-600"
        />
        <StatCard
          icon={<Truck className="w-4 h-4 text-sky-700" />}
          label="Deliveries in Progress"
          value="43"
          sub="● Live Tracking"
          subClass="text-sky-600"
        />
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-500">Area Efficiency</div>
            <Grid2x2 className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-semibold text-slate-800 mb-2">94.2%</div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: "94.2%" }} />
          </div>
        </div>
      </div>

      {/* Chart + hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-slate-700">Weekly Donation Trends</h2>
            <button className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600">
              Last 7 Days
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
          <div className="flex items-end justify-between gap-3 h-40">
            {WEEK_DATA.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end h-32">
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      d.day === "Thu" ? "bg-emerald-600" : "bg-emerald-100"
                    }`}
                    style={{ height: `${(d.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className={`text-xs ${d.day === "Thu" ? "text-emerald-700 font-medium" : "text-slate-400"}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="font-semibold text-slate-700 mb-4">Pickup Hotspots</h2>
          <div className="relative h-40 rounded-lg overflow-hidden bg-linear-to-br from-emerald-800 to-slate-700">
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 140" fill="none">
              <path d="M0 40 H200 M0 80 H200 M0 110 H200 M40 0 V140 M90 0 V140 M140 0 V140" stroke="white" strokeWidth="0.5" />
            </svg>
            <div className="absolute w-16 h-16 rounded-full bg-emerald-400/30 blur-xl top-6 left-10" />
            <div className="absolute w-12 h-12 rounded-full bg-amber-400/40 blur-xl bottom-4 right-8" />
            <div className="absolute bottom-3 left-3 bg-white/95 rounded-md px-2.5 py-1.5 text-xs flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> High Activity
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Critical Need
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent registrations */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-700">Recent Registrations</h2>
          <a href="/users" className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
            View All Users
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Organization</th>
              <th className="px-6 py-3 font-medium">Registration Date</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {REGISTRATIONS.map((r) => (
              <tr key={r.email} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="font-medium text-slate-700">{r.name}</div>
                      <div className="text-slate-400 text-xs">{r.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{r.org}</td>
                <td className="px-6 py-4 text-slate-600">{r.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_STYLES[r.role]}`}>
                    {r.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

function StatCard({ icon, label, value, sub, subClass }: { icon: React.ReactNode; label: string; value: string; sub: string; subClass: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-500">{label}</div>
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">{icon}</div>
      </div>
      <div className="text-3xl font-semibold text-slate-800 mb-1">{value}</div>
      <div className={`text-xs ${subClass}`}>{sub}</div>
    </div>
  );
}