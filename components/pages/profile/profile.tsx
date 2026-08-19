"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { BadgeCheck, Bell, Briefcase, Building2, Calendar, ChartColumn, CircleAlert, Eye, HelpCircle, ImagePlus, LayoutGrid, LogOut, Mail, MessageSquare, Pencil, Plus, Search, Soup, Table2, TrendingUp, Truck, UtensilsCrossed, X } from "lucide-react";
import Link from "next/link";
import { getDonationsByDonor } from "@/services/volunteerServices";
import type { BackendDonation } from "@/types/volunteerTypes";
import { updateProfile } from "@/services/authServices";

type StoredUser = {
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

type EditableField = "name" | "email" | "avatar";

const displayRole = (role?: string) => role ? role.charAt(0).toUpperCase() + role.slice(1) : "Donor";
const initials = (name?: string) => (name || "User").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
const formatDate = (date?: string) => date ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date)) : "Not available";

export default function Profile() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [donations, setDonations] = useState<BackendDonation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [donationError, setDonationError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<EditableField>("name");
  const [draftValue, setDraftValue] = useState("");
  const [verificationValue, setVerificationValue] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [avatarData, setAvatarData] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      queueMicrotask(() => setLoadingDonations(false));
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as StoredUser;
      queueMicrotask(() => setUser(parsedUser));
      const donorId = parsedUser._id || parsedUser.id;
      if (!donorId) {
        queueMicrotask(() => setLoadingDonations(false));
        return;
      }

      getDonationsByDonor(donorId)
        .then(setDonations)
        .catch((error: Error) => setDonationError(error.message))
        .finally(() => setLoadingDonations(false));
    } catch {
      queueMicrotask(() => {
        setDonationError("Unable to read the saved profile.");
        setLoadingDonations(false);
      });
    }
  }, []);

  const activeDonations = useMemo(() => donations.filter((donation) => ["Available", "Pending Pickup"].includes(donation.status)), [donations]);
  const pickupLocations = useMemo(() => new Set(donations.map((donation) => donation.pickupLocation)).size, [donations]);
  const fieldLabel = selectedField === "name" ? "full name" : selectedField === "email" ? "email address" : "profile picture";
  const valueMatches = selectedField === "avatar" ? avatarData !== null : draftValue.trim() !== "" && draftValue.trim() === verificationValue.trim();
  const userName = user?.name || "User";
  const userEmail = user?.email || "No email saved";
  const avatarSrc = user?.avatarUrl ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}${user.avatarUrl}` : null;

  const openEditModal = () => {
    setSelectedField("name");
    setDraftValue(user?.name || "");
    setVerificationValue("");
    setIsReadyToSave(false);
    setIsConfirming(false);
    setProfileError(null);
    setAvatarData(null);
    setIsEditOpen(true);
  };

  const selectField = (field: EditableField) => {
    setSelectedField(field);
    setDraftValue(field === "name" ? user?.name || "" : field === "email" ? user?.email || "" : "");
    setVerificationValue("");
    setIsReadyToSave(false);
    setIsConfirming(false);
    setProfileError(null);
  };

  const openAvatarPicker = () => {
    setSelectedField("avatar");
    setDraftValue("");
    setVerificationValue("");
    setIsReadyToSave(false);
    setIsConfirming(false);
    setProfileError(null);
    setAvatarData(null);
    setIsEditOpen(true);
    avatarInputRef.current?.click();
  };

  const handleAvatarFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setProfileError("Profile images must be 2 MB or smaller");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarData(typeof reader.result === "string" ? reader.result : null);
      setIsReadyToSave(false);
      setProfileError(null);
    };
    reader.readAsDataURL(file);
  };

  const startConfirmation = () => {
    if (!valueMatches) return;
    setIsConfirming(true);
    window.setTimeout(() => setIsReadyToSave(true), 1200);
  };

  const saveProfileChange = () => {
    if (!isReadyToSave || !user || isSaving) return;
    setIsSaving(true);
    setProfileError(null);
    const profileUpdate = selectedField === "avatar" ? { avatar: avatarData || undefined } : { [selectedField]: draftValue.trim() };
    updateProfile(profileUpdate)
      .then((updatedUser: StoredUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditOpen(false);
        setIsConfirming(false);
        setIsReadyToSave(false);
        setAvatarData(null);
      })
      .catch((error: Error) => {
        setProfileError(error.message);
        setIsConfirming(false);
        setIsReadyToSave(false);
      })
      .finally(() => setIsSaving(false));
  };
  return(
     <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      <input ref={avatarInputRef} id="profile-avatar-upload" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleAvatarFile} />
      {/* Sidebar */}
      <aside className="w-60 bg-emerald-950 shrink-0 flex flex-col p-4">
        <div className="flex items-center gap-3 px-2 py-3 mb-8">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-white font-semibold text-sm">Vitality Hub</div>
            <div className="text-emerald-300 text-xs">Logistics Panel</div>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <Link
            href="/userdashboard/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-300 text-sm font-medium hover:bg-emerald-900 transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            Overview
          </Link>
          <Link
            href="/userdashboard/donations"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-300 text-sm font-medium hover:bg-emerald-900 transition-colors"
          >
            <Table2 className="w-4 h-4" />
            Donations
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-1">
          
          <Link href="/donations" className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold mb-4 hover:bg-emerald-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Donation
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-emerald-400 text-sm">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-red-400 text-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </a>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-bold text-gray-900">Vitality Logistics</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search trackings..."
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-56 outline-none placeholder-gray-400"
              />
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button type="button" onClick={openAvatarPicker} aria-label="Choose profile picture" className="flex items-center gap-2">
            <div className="w-9 h-9 overflow-hidden rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {avatarSrc ? <img src={avatarSrc} alt="Profile" className="h-full w-full object-cover" /> : initials(userName)}
            </div>
            </button>
            
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {/* Profile card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative shrink-0 w-fit">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg font-semibold">
                  {avatarSrc ? <img src={avatarSrc} alt="Profile" className="h-full w-full rounded-full object-cover" /> : initials(userName)}
                </div>
                <button type="button" onClick={openAvatarPicker} aria-label="Choose profile picture" className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center hover:bg-emerald-700 transition-colors">
                  <Pencil className="w-3 h-3 text-white" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{userName}</h2>
                  <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${user?.verified ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                    <BadgeCheck className="w-3 h-3" />
                    {user?.verified ? "Verified Donor" : "Unverified Donor"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="leading-tight">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Role</div>
                      <div className="text-sm text-gray-700 font-medium">{displayRole(user?.role)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="leading-tight">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Organization</div>
                      <div className="text-sm text-gray-700 font-medium">{user?.status ? displayRole(user.status) : "Active account"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="leading-tight">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Join Date</div>
                      <div className="text-sm text-gray-700 font-medium">{formatDate(user?.createdAt)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="leading-tight">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Contact</div>
                      <div className="text-sm text-gray-700 font-medium">{userEmail}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button onClick={openEditModal} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
                <Pencil className="w-3.5 h-3.5" />
                Edit Profile
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors">
                <Eye className="w-3.5 h-3.5" />
                Public View
              </button>
            </div>
          </div>
        </div>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 font-medium">Active Donations</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{activeDonations.length}</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                <TrendingUp className="w-3 h-3" />
                +1 since yesterday
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 font-medium">Donations Made</span>
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Soup className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-amber-600 mb-1">{donations.length}</div>
              <div className="text-xs text-gray-400">Lifetime total</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 font-medium">Pickup Locations</span>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{pickupLocations}</div>
              <div className="text-xs text-gray-400">Across your donations</div>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            

            {/* Right column */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Active Donations</h3>
                <Link href="/userdashboard/donations" className="text-sm text-emerald-600 font-medium hover:underline">
                  View all donations
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {loadingDonations && <div className="bg-white rounded-xl border border-gray-200 p-5 text-sm text-gray-500">Loading your donations...</div>}
                {donationError && <div className="bg-red-50 rounded-xl border border-red-200 p-5 text-sm text-red-700">{donationError}</div>}
                {!loadingDonations && !donationError && activeDonations.length === 0 && <div className="bg-white rounded-xl border border-gray-200 p-5 text-sm text-gray-500">You have no active donations yet.</div>}
                {activeDonations.map((donation) => <div key={donation._id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <ChartColumn className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">
                          {donation.itemName}
                        </div>
                        <div className="text-xs text-gray-400">{donation.foodType} · {donation.quantity}</div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {donation.status}
                    </span>
                  </div>

                  <div className="h-1.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
                    <div className={`h-full rounded-full ${donation.status === "Pending Pickup" ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: donation.status === "Pending Pickup" ? "45%" : "20%" }} />
                  </div>
                  <div className="flex justify-between text-xs mb-4">
                    <span className="text-gray-900 font-medium">Posted</span>
                    <span className="text-gray-900 font-medium">Matched</span>
                    <span className="text-gray-400">Pickup</span>
                    <span className="text-gray-400">Delivered</span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                        MC
                      </div>
                      <span className="text-xs text-gray-500">Pickup: {donation.pickupLocation}</span>
                    </div>
                    <MessageSquare className="w-4 h-4 text-gray-300" />
                  </div>
                </div>)}
                {/* Tracking 2 */}
                <div className="hidden">
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                        <Soup className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">
                          Vegetable Stew (Large Tray)
                        </div>
                        <div className="text-xs text-gray-400">Batch #VO-301 · 8.0kg</div>
                      </div>
                    </div>
                    <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full shrink-0">
                      Awaiting Pickup
                    </span>
                  </div>

                  <div className="h-1.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }} />
                  </div>
                  <div className="flex justify-between text-xs mb-4">
                    <span className="text-gray-900 font-medium">Posted</span>
                    <span className="text-gray-400">Matched</span>
                    <span className="text-gray-400">Pickup</span>
                    <span className="text-gray-400">Delivered</span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Ready at service entrance</span>
                    <span className="text-xs text-amber-600 font-semibold">Expiring in 2h</span>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-100 px-6 py-6 mt-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="text-emerald-700 font-bold text-sm mb-1">Vitality Logistics</div>
              <p className="text-xs text-gray-500 max-w-sm">
                Vitality Food Redistribution Platform. Delivering Care and Precision with every
                donation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-700">FAQ</a>
              <a href="#" className="hover:text-gray-700">Contact</a>
              <a href="#" className="hover:text-gray-700">About</a>
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Terms of Service</a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto text-xs text-gray-400 mt-4">© 2024</div>
        </footer>

        {isEditOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="edit-profile-title" className="text-lg font-bold text-gray-900">Edit profile</h2>
                <p className="mt-1 text-sm text-gray-500">Choose one detail and verify the new value.</p>
              </div>
              <button onClick={() => setIsEditOpen(false)} aria-label="Close edit profile" className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <label className="mt-6 block text-sm font-semibold text-gray-700">What would you like to edit?</label>
            <select value={selectedField} onChange={(event) => selectField(event.target.value as EditableField)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500">
              <option value="name">Full name</option>
              <option value="email">Email address</option>
              <option value="avatar">Profile picture</option>
            </select>
            {selectedField === "avatar" ? <label htmlFor="profile-avatar-upload" className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-600 hover:border-emerald-500">
              <ImagePlus className="h-5 w-5 text-emerald-600" />
              <span>{avatarData ? "Image selected" : "Choose a JPEG, PNG, or WebP image"}</span>
              <span className="sr-only">Choose profile picture</span>
            </label> : <>
              <label className="mt-4 block text-sm font-semibold text-gray-700">New {fieldLabel}</label>
              <input value={draftValue} onChange={(event) => { setDraftValue(event.target.value); setIsReadyToSave(false); }} type={selectedField === "email" ? "email" : "text"} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
              <label className="mt-4 block text-sm font-semibold text-gray-700">Enter it again to verify</label>
              <input value={verificationValue} onChange={(event) => { setVerificationValue(event.target.value); setIsReadyToSave(false); }} type={selectedField === "email" ? "email" : "text"} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
              {!valueMatches && verificationValue && <p className="mt-2 flex items-center gap-1 text-xs text-red-600"><CircleAlert className="h-3.5 w-3.5" />Values do not match.</p>}
            </>}
            {profileError && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{profileError}</p>}
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setIsEditOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={isReadyToSave ? saveProfileChange : startConfirmation} disabled={!valueMatches || (isConfirming && !isReadyToSave) || isSaving} className="relative overflow-hidden rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                {isConfirming && !isReadyToSave && <span className="absolute inset-y-0 left-0 w-full origin-left animate-[confirm-progress_1.2s_linear] bg-gray-400" />}
                <span className="relative">{isSaving ? "Saving..." : isReadyToSave ? "Confirm change" : "Confirm"}</span>
              </button>
            </div>
          </div>
        </div>}

      </div>
    </div>
  );
}