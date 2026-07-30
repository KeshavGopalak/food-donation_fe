"use client";
import {
  Bell,
  LayoutGrid,
  LogOut,
  MapPin,
  Search,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { requests } from "@/Constants/NearbyData";


export default function NearbyRequests() {
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
                {requests.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          r.urgency === "urgent"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {r.tag}
                      </span>
                      <span className="text-xs text-gray-400">
                        {r.distance}
                      </span>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm mb-0.5">
                      {r.title}
                    </div>
                    <div className="text-xs text-gray-400 mb-4">{r.detail}</div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 bg-emerald-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                        Accept Pickup
                      </button>
                      <span className="w-9 h-9 shrink-0 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
                        A
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
