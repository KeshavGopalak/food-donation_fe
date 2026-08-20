"use client";

import { useEffect, useState } from "react";
import { Search, ChevronDown, UserPlus, MoreVertical, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import Layout from "./layout";
import { createAdminUser, getAllAdminUsers, getDonationsByDonor, updateAdminUser } from "@/services/adminServices";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: string;
  status: string;
  verified: boolean;
  createdAt: string;
}

interface DonationHistoryItem {
  _id: string;
  foodType: string;
  itemName: string;
  quantity: string;
  expiryWindow: string;
  pickupLocation: string;
  photoUrl?: string | null;
  description: string;
  donorId: string;
  donorName: string;
  donorEmail: string;
  status: string;
  createdAt: string;
}

const ROLE_STYLE_MAP: Record<string, string> = {
  User: "bg-slate-100 text-slate-600",
  Volunteer: "bg-sky-50 text-sky-700",
  Admin: "bg-slate-100 text-slate-700",
  Donor: "bg-amber-50 text-amber-700",
  Shelter: "bg-sky-50 text-sky-700",
};

const STATUS_STYLE_MAP: Record<string, { dot: string; text: string }> = {
  Active: { dot: "bg-emerald-500", text: "text-emerald-600" },
  Pending: { dot: "bg-amber-500", text: "text-amber-600" },
  Inactive: { dot: "bg-slate-400", text: "text-slate-400" },
  Denied: { dot: "bg-rose-500", text: "text-rose-600" },
  Verified: { dot: "bg-emerald-500", text: "text-emerald-600" },
};

function normalizeRole(role: string) {
  switch (role?.toLowerCase()) {
    case "admin":
      return "Admin";
    case "volunteer":
      return "Volunteer";
    case "user":
      return "User";
    case "donor":
      return "Donor";
    case "shelter":
      return "Shelter";
    default:
      return role ? `${role.charAt(0).toUpperCase()}${role.slice(1)}` : "User";
  }
}

function normalizeStatus(status: string) {
  switch (status?.toLowerCase()) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "pending":
      return "Pending";
    case "verified":
      return "Verified";
    default:
      return status ? `${status.charAt(0).toUpperCase()}${status.slice(1)}` : "Pending";
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function formatDate(dateString: string) {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.valueOf())) {
    return "-";
  }
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [verifiedFilter, setVerifiedFilter] = useState("All Verification");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [userDonations, setUserDonations] = useState<DonationHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("User");
  const [newStatus, setNewStatus] = useState("Pending");
  const [newVerified, setNewVerified] = useState(false);
  const [addUserError, setAddUserError] = useState<string | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    getAllAdminUsers()
      .then((users) => {
        setUsers(users);
        setFetchError(null);
      })
      .catch((error) => {
        setFetchError(error?.message ?? "Unable to fetch users.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setUserDonations([]);
      setHistoryError(null);
      return;
    }

    setHistoryLoading(true);
    getDonationsByDonor(selectedUser._id)
      .then((donations) => {
        setUserDonations(donations);
        setHistoryError(null);
      })
      .catch((error) => {
        setHistoryError(error?.message ?? "Unable to load donation history.");
      })
      .finally(() => setHistoryLoading(false));
  }, [selectedUser]);

  const filteredUsers = users.filter((user) => {
    const query = search.trim().toLowerCase();
    const roleLabel = normalizeRole(user.role);
    const statusLabel = normalizeStatus(user.status);
    const verifiedLabel = user.verified ? "Verified" : "Unverified";

    if (roleFilter !== "All Roles" && roleLabel !== roleFilter) {
      return false;
    }

    if (statusFilter !== "All Statuses" && statusLabel !== statusFilter) {
      return false;
    }

    if (verifiedFilter !== "All Verification" && verifiedLabel !== verifiedFilter) {
      return false;
    }

    if (!query) return true;

    return [
      user.name,
      user.email,
      roleLabel,
      statusLabel,
    ]
      .some((value) => value.toLowerCase().includes(query));
  });

  const openUserDetails = (user: AdminUser) => setSelectedUser(user);
  const closeUserDetails = () => setSelectedUser(null);

  const updateStatus = async (userId: string, status: string, verified: boolean) => {
    try {
      const updatedUser = await updateAdminUser(userId, { status, verified });
      setUsers((prev) => prev.map((user) => user._id === userId ? { ...user, ...updatedUser } : user));
      if (selectedUser?._id === userId) setSelectedUser({ ...selectedUser, ...updatedUser });
    } catch (error: any) {
      setFetchError(error?.message ?? "Unable to update user.");
    }
  };

  const handleApprove = () => {
    if (!selectedUser) return;
    void updateStatus(selectedUser._id, "Active", true);
  };

  const handleDeny = () => {
    if (!selectedUser) return;
    void updateStatus(selectedUser._id, "Denied", false);
  };

  const handlePromote = () => {
    if (!selectedUser || selectedUser.role.toLowerCase() === "volunteer") return;
    void updateAdminUser(selectedUser._id, { role: "volunteer", status: "active", verified: true }).then((updatedUser) => {
      setUsers((prev) => prev.map((user) => user._id === selectedUser._id ? { ...user, ...updatedUser } : user));
      setSelectedUser((current) => current?._id === selectedUser._id ? { ...current, ...updatedUser } : current);
    }).catch((error: any) => setFetchError(error?.message ?? "Unable to promote user."));
  };

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

        <FilterDropdown
          label="Role"
          value={roleFilter}
          options={["All Roles", "User", "Volunteer", "Admin", "Donor", "Shelter"]}
          onChange={(value) => setRoleFilter(value)}
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          options={["All Statuses", "Pending", "Active", "Inactive", "Denied"]}
          onChange={(value) => setStatusFilter(value)}
        />
        <FilterDropdown
          label="Verified"
          value={verifiedFilter}
          options={["All Verification", "Verified", "Unverified"]}
          onChange={(value) => setVerifiedFilter(value)}
        />

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 transition-colors text-white text-sm font-medium rounded-lg px-4 py-2.5 whitespace-nowrap"
        >
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
              <th className="px-6 py-3 font-medium">Join Date</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                  Loading users...
                </td>
              </tr>
            ) : fetchError ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-rose-500">
                  Unable to load users. {fetchError}
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const roleLabel = normalizeRole(user.role);
                const statusLabel = normalizeStatus(user.status);
                const verifiedLabel = user.verified ? "Verified" : "Unverified";
                const statusStyle = STATUS_STYLE_MAP[statusLabel] ?? STATUS_STYLE_MAP.Pending;
                const roleClass = ROLE_STYLE_MAP[roleLabel] ?? ROLE_STYLE_MAP.User;

                return (
                  <tr
                    key={user._id}
                    onClick={() => openUserDetails(user)}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-semibold">
                            {getInitials(user.name)}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-slate-700">{user.name}</div>
                          <div className="text-slate-400 text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${roleClass}`}>
                        {roleLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusStyle.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                          {statusLabel}
                        </span>
                        <span className="text-xs text-slate-400">{verifiedLabel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 text-xs ${user.verified ? "text-emerald-600" : "text-slate-500"}`}>
                        {user.verified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openUserDetails(user);
                        }}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-3 text-sm text-slate-400">
          <span>
            Showing {loading || filteredUsers.length === 0 ? 0 : 1}-{Math.min(filteredUsers.length, 10)} of {users.length} users
          </span>
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

      {isAddModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="text-lg font-semibold text-slate-900">Add New User</div>
                <p className="text-sm text-slate-500">Create a new user account and add it to the list.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setAddUserError(null);
                }}
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Name</span>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                    placeholder="Full name"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Email</span>
                  <input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                    placeholder="Email address"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Password</span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                    placeholder="Password"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Role</span>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  >
                    <option>User</option>
                    <option>Volunteer</option>
                    <option>Admin</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Status</span>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  >
                    <option>Pending</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Denied</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Verified</span>
                  <select
                    value={newVerified ? "Verified" : "Unverified"}
                    onChange={(e) => setNewVerified(e.target.value === "Verified")}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  >
                    <option>Unverified</option>
                    <option>Verified</option>
                  </select>
                </label>
              </div>
              {addUserError && <div className="text-sm text-rose-600">{addUserError}</div>}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    setCreatingUser(true);
                    setAddUserError(null);
                    if (!newName || !newEmail || !newPassword) {
                      setAddUserError("Please fill all fields.");
                      setCreatingUser(false);
                      return;
                    }

                    try {
                      const createdUser = await createAdminUser({
                        name: newName,
                        email: newEmail,
                        password: newPassword,
                        role: newRole,
                        status: newStatus,
                        verified: newVerified,
                      });
                      setUsers((prev) => [createdUser, ...prev]);
                      setIsAddModalOpen(false);
                      setNewName("");
                      setNewEmail("");
                      setNewPassword("");
                      setNewRole("User");
                      setNewStatus("Pending");
                      setNewVerified(false);
                    } catch (error: any) {
                      setAddUserError(error?.message ?? "Unable to create user.");
                    } finally {
                      setCreatingUser(false);
                    }
                  }}
                  className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  {creatingUser ? "Creating..." : "Create User"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setAddUserError(null);
                  }}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedUser ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <div className="text-lg font-semibold text-slate-900">{selectedUser.name}</div>
                <div className="text-sm text-slate-500">{selectedUser.email}</div>
                <div className="mt-2 text-xs text-slate-400">Role: {normalizeRole(selectedUser.role)}</div>
                <div className="text-xs text-slate-400">Status: {normalizeStatus(selectedUser.status)}</div>
                <div className="text-xs text-slate-400">Verified: {selectedUser.verified ? "Yes" : "No"}</div>
              </div>
              <button
                type="button"
                onClick={closeUserDetails}
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 px-6 py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-700">Donation History</div>
                  <p className="text-xs text-slate-400">Shows all donations posted by this user.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={handleDeny}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Deny
                  </button>
                  {selectedUser.role.toLowerCase() === "user" && (
                    <button
                      type="button"
                      onClick={handlePromote}
                      className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100"
                    >
                      Promote to volunteer
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                {historyLoading ? (
                  <p className="text-sm text-slate-500">Loading donation history...</p>
                ) : historyError ? (
                  <p className="text-sm text-rose-600">{historyError}</p>
                ) : userDonations.length === 0 ? (
                  <p className="text-sm text-slate-500">No donation history found for this user.</p>
                ) : (
                  <div className="space-y-4">
                    {userDonations.map((donation) => (
                      <div key={donation._id} className="rounded-3xl border border-slate-200 bg-white p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{donation.itemName}</div>
                            <div className="text-xs text-slate-400">{donation.foodType} • {donation.quantity}</div>
                          </div>
                          <div className="text-xs text-slate-500">{formatDate(donation.createdAt)}</div>
                        </div>
                        <div className="mt-3 text-sm text-slate-600">{donation.description || "No description provided."}</div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span>{donation.pickupLocation}</span>
                          <span>{donation.expiryWindow}</span>
                          <span>Status: {donation.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

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

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-600 bg-white">
      <span className="text-xs text-slate-400 uppercase">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm text-slate-600 outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-white text-slate-900">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
    </label>
  );
}