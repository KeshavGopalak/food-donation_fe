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
import { updateDonationStatus } from "@/services/volunteerServices";


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
    <div className="min-h-screen bg-sky-50/60 flex font-sans text-slate-900">
      

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        

        {/* Content */}
        <main className="flex-1 flex min-h-0">
          {/* Requests list */}
          <div className="w-full lg:w-95 shrink-0 border-r border-sky-100 bg-white/90 flex flex-col overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-5">
                <button className="px-3 py-1.5 rounded-xl bg-cyan-500 text-sky-950 text-xs font-semibold shadow-sm shadow-cyan-950/15">
                  All Requests
                </button>
                <button className="px-3 py-1.5 rounded-xl text-gray-500 text-xs font-semibold hover:bg-sky-50 transition-colors">
                  Urgent Only
                </button>
                <button className="px-3 py-1.5 rounded-xl text-gray-500 text-xs font-semibold hover:bg-sky-50 transition-colors">
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
                    className="bg-white rounded-2xl border border-sky-100 p-4 shadow-sm shadow-sky-950/5"
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
                        className={`flex-1 text-sm font-semibold py-2 rounded-xl transition-colors ${
                          isAccepted
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-cyan-500 text-sky-950 hover:bg-cyan-400"
                        }`}
                      >
                        {isAccepted ? "Request Accepted" : "Accept Request"}
                      </button>
                      <span className="w-9 h-9 shrink-0 rounded-xl border border-sky-100 bg-sky-50 flex items-center justify-center text-sky-700 text-sm font-semibold">
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
                      className="w-8 h-8 rounded-xl border border-sky-100 text-gray-500 flex items-center justify-center hover:bg-sky-50 transition-colors"
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
                            ? "bg-cyan-500 text-sky-950"
                            : "border border-sky-100 text-gray-500 hover:bg-sky-50"
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
                      className="w-8 h-8 rounded-xl border border-sky-100 text-gray-500 flex items-center justify-center hover:bg-sky-50 transition-colors"
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
