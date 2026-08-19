"use client";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  LogOut,
  MapPin,
  Search,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useDonations } from "@/hooks/auth/useDonation";
import { useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";



const updateDonationStatus = async (donationId: string, status: string) => {
  try {
    const response = await fetch(
      `${API_URL}/api/donations/${donationId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update donation status");
    }

    const updatedDonation = await response.json();
    console.log("Donation status updated:", updatedDonation);
    return true;
  } catch (error) {
    console.error("Error updating donation status:", error);
    return false;
  }
};

export default function NearbyRequests() {

  const { data } = useDonations();
  const [acceptedDonationIds, setAcceptedDonationIds] = useState<Set<string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;
  const totalPages = Math.ceil((data?.length ?? 0) / requestsPerPage);
  const page = Math.min(currentPage, Math.max(totalPages, 1));
  const visibleRequests = data?.slice(
    (page - 1) * requestsPerPage,
    page * requestsPerPage
  );

  const handleAccept = async (donationId: string) => {
    setAcceptedDonationIds((ids) => new Set(ids).add(donationId));

    const updated = await updateDonationStatus(donationId, "Pending Pickup");
    if (!updated) {
      setAcceptedDonationIds((ids) => {
        const nextIds = new Set(ids);
        nextIds.delete(donationId);
        return nextIds;
      });
    }
  };

 
  const position = { lat: 53.54992, lng: 10.00678 };
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
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
            href="/volunteerdashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-300 text-sm font-medium hover:bg-emerald-900 transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            Overview
          </Link>
          <Link
            href="/nearby-requests"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Nearby Requests
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-red-400 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </a>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-bold text-gray-900">
            Nearby Pickup Requests
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search locations..."
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-56 outline-none placeholder-gray-400"
              />
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <Link href="/profile" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                JD
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 flex min-h-0">
          {/* Requests list */}
          <div className="w-full lg:w-95 shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-5">
                <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold">
                  All Requests
                </button>
                <button className="px-3 py-1.5 rounded-lg text-gray-500 text-xs font-semibold hover:bg-gray-100 transition-colors">
                  Urgent Only
                </button>
                <button className="px-3 py-1.5 rounded-lg text-gray-500 text-xs font-semibold hover:bg-gray-100 transition-colors">
                  Distance
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {visibleRequests?.map((r) => {
                  const isAccepted =
                    r.status !== "Available" || acceptedDonationIds.has(r._id);

                  return (
                  <div
                    key={r._id}
                    className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 shrink-0 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold">
                          {r.donorName.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {r.donorName}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(r.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm mb-0.5">
                      {r.itemName} - {r.quantity} ({r.foodType})
                    </div>
                    <div className="text-xs text-gray-400 mb-1">
                      Pickup Location: {r.pickupLocation}
                    </div>
                    <div className="text-xs text-gray-400 mb-4">{r.description}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAccept(r._id)}
                        disabled={isAccepted}
                        className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-colors ${
                          isAccepted
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        {isAccepted ? "Request Accepted" : "Accept Request"}
                      </button>
                      <span className="w-9 h-9 shrink-0 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
                        A
                      </span>
                    </div>
                  </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  {page > 1 && (
                    <button
                      onClick={() => setCurrentPage(page - 1)}
                      aria-label="Previous page"
                      className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        aria-label={`Go to page ${pageNumber}`}
                        aria-current={pageNumber === page ? "page" : undefined}
                        className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                          pageNumber === page
                            ? "bg-emerald-600 text-white"
                            : "border border-gray-200 text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}

                  {page < totalPages && (
                    <button
                      onClick={() => setCurrentPage(page + 1)}
                      aria-label="Next page"
                      className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          {/* <RequestsMap /> */}
          <APIProvider apiKey={""}>
            <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
              <AdvancedMarker position={position} />
            </Map>
          </APIProvider>
        </main>
      </div>
    </div>
  );
}
