"use client";

import { useState } from "react";
import { Search, ChevronDown, UserPlus, MoreVertical, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import Layout from "./layout";
type Role = "Donor" | "Volunteer" | "Shelter";
type Status = "Active" | "Pending" | "Inactive";

interface User {
  name: string;
  email: string;
  avatar: string | null;
  initials?: string;
  org: string;
  joinDate: string;
  role: Role;
  status: Status;
}


const USERS: User[] = [
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

const ROLE_STYLES = {
  Donor: "bg-amber-50 text-amber-700",
  Volunteer: "bg-emerald-50 text-emerald-700",
  Shelter: "bg-sky-50 text-sky-700",
};

const STATUS_STYLES = {
  Active: { dot: "bg-emerald-500", text: "text-emerald-600" },
  Pending: { dot: "bg-amber-500", text: "text-amber-600" },
  Inactive: { dot: "bg-slate-400", text: "text-slate-400" },
};

export default function UsersPage() {
  const [search, setSearch] = useState("");

  return (
    <Layout activePage="users" pageTitle="User Management">
      {/* Controls row */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users or organizations..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
        </div>

        <FilterDropdown label="Role" value="All Roles" />
        <FilterDropdown label="Status" value="All Statuses" />

        <button className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 transition-colors text-white text-sm font-medium rounded-lg px-4 py-2.5 whitespace-nowrap">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
              <th className="px-6 py-3 font-medium">User Details</th>
              <th className="px-6 py-3 font-medium">Organization</th>
              <th className="px-6 py-3 font-medium">Join Date</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => {
              const statusStyle = STATUS_STYLES[user.status];

              return (
                <tr key={user.email} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-semibold">
                          {user.initials}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-slate-700">{user.name}</div>
                        <div className="text-slate-400 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{user.org}</td>
                  <td className="px-6 py-4 text-slate-600">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_STYLES[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusStyle.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-3 text-sm text-slate-400">
          <span>Showing 1-10 of 42 users</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md hover:bg-slate-100 disabled:opacity-40" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded-md bg-emerald-600 text-white font-medium">1</button>
            <button className="w-7 h-7 rounded-md hover:bg-slate-100 text-slate-500">2</button>
            <button className="w-7 h-7 rounded-md hover:bg-slate-100 text-slate-500">3</button>
            <button className="p-1.5 rounded-md hover:bg-slate-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-2">Total Users</div>
          <div className="text-3xl font-semibold text-slate-800">1,284</div>
          <div className="text-xs text-emerald-600 mt-1">↗ +12% this month</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-2">Active Donors</div>
          <div className="text-3xl font-semibold text-slate-800">342</div>
          <div className="text-xs text-slate-400 mt-1">ⓘ Stable growth</div>
        </div>
        <div className="bg-emerald-600 rounded-xl p-5 flex items-center justify-between text-white">
          <div>
            <div className="text-sm font-semibold mb-1">Pending Verifications</div>
            <p className="text-xs text-emerald-50/90 max-w-55 mb-3">
              There are 14 shelter organizations waiting for documentation review.
            </p>
            <button className="bg-emerald-800/40 hover:bg-emerald-800/60 transition-colors text-white text-xs font-medium rounded-lg px-3 py-2">
              Review Requests
            </button>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FilterDropdown({ label, value } : { label: string; value: string }) {
  return (
    <button className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-600 bg-white whitespace-nowrap">
      <span className="text-xs text-slate-400 uppercase">{label}:</span>
      {value}
      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
    </button>
  );
}