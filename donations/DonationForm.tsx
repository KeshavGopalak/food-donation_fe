"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { label: "Select Category", value: "" },
  { label: "Bakery", value: "Bakery" },
  { label: "Produce", value: "Produce" },
  { label: "Dairy", value: "Dairy" },
  { label: "Cooked Meals", value: "Cooked Meals" },
  { label: "Beverages", value: "Beverages" },
  { label: "Other", value: "Other" },
];

interface NearbyDonation {
  _id: string;
  foodType: string;
  itemName: string;
  quantity: string;
  donorName: string;
  status: string;
  createdAt: string;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

export default function DonationForm() {
  const [formData, setFormData] = useState({
    foodType: "",
    itemName: "",
    quantity: "",
    expiryWindow: "",
    pickupLocation: "",
    description: "",
  });

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [nearby, setNearby] = useState<NearbyDonation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // Fetch the logged-in user and nearby donations on mount
  useEffect(() => {
    fetchCurrentUser();
    fetchNearbyFood();
  }, []);

  const fetchCurrentUser = async () => {
    setUserLoading(true);
    try {
      console.log("user data",  localStorage.getItem("user"));
      const userdata = localStorage.getItem("user");
      console.log("Fetched user from localStorage:", userdata);
      if (!userdata) {
        setCurrentUser(null);
        return;
      }

      // const response = await fetch(`${API_URL}/api/auth/me`);

      // if (!response.ok) throw new Error("Failed to fetch current user");

      // const data = await response.json();
      // Adjust this mapping if your /api/auth/me shape differs

    const user = JSON.parse(userdata);
      setCurrentUser({
        id: user._id ,
        name: user.name ,
        email: user.email
      });
      console.log("Current user set:", currentUser);
    } catch (err: any) {
      console.error("Error fetching current user:", err);
      setCurrentUser(null);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchNearbyFood = async () => {
    try {
      const response = await fetch(`${API_URL}/api/donations/nearby`);
      if (!response.ok) throw new Error("Failed to fetch nearby food");
      const data = await response.json();
      setNearby(data.donations || []);
    } catch (err: any) {
      console.error("Error fetching nearby food:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string | null) => {
    if (value) {
      setFormData((prev) => ({ ...prev, foodType: value }));
    }
  };

 const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Generate a short blob URL for the selected file
    const objectUrl = URL.createObjectURL(file);
    setPhotoUrl(objectUrl);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setError("You must be logged in to post a donation.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        ...formData,
        photoUrl,
        donorId: currentUser.id,
        donorName: currentUser.name,
        donorEmail: currentUser.email,
      };

      const response = await fetch(`${API_URL}/api/donations/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || "Failed to create donation");
      }

      await response.json();
      setSuccess(true);

      // Clear form
      setFormData({
        foodType: "",
        itemName: "",
        quantity: "",
        expiryWindow: "",
        pickupLocation: "",
        description: "",
      });
      setPhotoUrl(null);

      // Refresh nearby food list
      await fetchNearbyFood();

      // Show success message for 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      foodType: "",
      itemName: "",
      quantity: "",
      expiryWindow: "",
      pickupLocation: "",
      description: "",
    });
    setPhotoUrl(null);
    setError(null);
  };

  const getTimeAgo = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <section className="min-h-[70vh] px-6 py-12 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left / Main form */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-emerald-700 mb-2">
                Post Surplus Food
              </h2>
              <p className="text-gray-600">
                Convert your excess inventory into community impact within seconds.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                Peak Surplus Hours
              </span>
            </div>
          </div>

          {!userLoading && !currentUser && (
            <div className="mb-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-sm">
              You need to be logged in to post a donation.
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
              Donation posted successfully!
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              <span className="font-medium text-gray-900">Add New Donation</span>
              <p className="mt-1">Required fields are marked with <span className="text-red-500">*</span></p>
            </div>

            {/* Food Type and Item Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Type <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={handleSelectChange} value={formData.foodType}>
                  <SelectTrigger className="w-full rounded-lg border border-gray-300 p-3 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                  placeholder="e.g., Artisanal Sourdough"
                  required
                />
              </div>
            </div>

            {/* Quantity and Expiry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                  placeholder="e.g., 15 kg or 10 trays"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Time/Window <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="expiryWindow"
                  value={formData.expiryWindow}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                  placeholder="e.g., Available until 9 PM"
                  required
                />
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white p-3 text-gray-700 shadow-sm">
                <svg
                  className="w-5 h-5 text-emerald-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 21s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
                  ></path>
                </svg>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none placeholder-gray-400"
                  placeholder="Main Street Kitchen, 124 Heart Rd, Floor 2"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 p-3 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm resize-none"
                placeholder="Add any additional details about the food..."
                rows={3}
              />
            </div>

            {/* Upload Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Photo
              </label>
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 shadow-sm hover:bg-gray-50 transition">
                <div className="text-center">
                  {photoUrl ? (
                    <div className="space-y-3">
                      <img src={photoUrl} alt="Preview" className="max-h-40 mx-auto rounded-lg shadow-md" />
                      <label className="inline-block text-sm text-emerald-600 font-medium cursor-pointer hover:underline">
                        Change Image
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto text-gray-400"
                      >
                        <path
                          d="M12 3v10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 7l4-4 4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="10"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                        Drag and drop or <span className="text-emerald-600 hover:underline">browse files</span>
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                      </label>
                      <div className="text-xs text-gray-500">JPG, PNG up to 5MB</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={loading || !currentUser}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Posting..." : "Post Donation"}
              </button>
              <button
                type="button"
                onClick={handleClearForm}
                className="inline-flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Right / Sidebar */}
        <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
          {/* Network Impact Banner */}
          <div className="rounded-lg overflow-hidden mb-6 relative">
            <div
              className="h-36 bg-cover bg-center flex items-end p-4 text-white"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(6,95,70,0.8), rgba(6,95,70,0.4)), url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=400&fit=crop')",
              }}
            >
              <div>
                <div className="text-xs uppercase tracking-wide font-semibold opacity-90">
                  Network Impact
                </div>
                <div className="font-bold text-lg">
                  Join 2,400+ Local Partners
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Shared Food */}
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Nearby Shared Food
          </h3>
          <div className="text-xs text-gray-500 mb-3">Live community availability</div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {nearby.length > 0 ? (
              nearby.slice(0, 3).map((item) => (
                <div key={item._id} className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                          {item.foodType}
                        </span>
                        <span className="text-xs text-amber-600 font-semibold">
                          {item.status === "Available" ? "HIGH DEMAND" : item.status}
                        </span>
                      </div>
                      <div className="font-semibold text-gray-900 text-sm">{item.donorName}</div>
                      <div className="text-xs text-gray-600">
                        shared {item.quantity} of {item.itemName}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 shrink-0 ml-2">
                      {getTimeAgo(item.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p className="text-sm">No donations available yet.</p>
                <p className="text-xs mt-1">Be the first to help!</p>
              </div>
            )}
          </div>

          {/* View Local Map Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                // In a real app, this would open a map interface or navigate to a map page
                alert("Map feature coming soon! This will show all nearby donations in your area.");
              }}
              className="text-sm text-emerald-700 font-medium hover:underline hover:text-emerald-800 transition-colors cursor-pointer"
            >
              View Local Map
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}