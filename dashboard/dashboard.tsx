import React from 'react';
import Link from 'next/link';
import {
  UtensilsCrossed,
  LayoutGrid,
  Table2,
  Plus,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Truck,
  Soup,
  Building2,
  TrendingUp,
  Recycle,
  Croissant,
  ChartColumn,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
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
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium"
          >
            <LayoutGrid className="w-4 h-4" />
            Overview
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-300 text-sm font-medium hover:bg-emerald-900 transition-colors"
          >
            <Table2 className="w-4 h-4" />
            Donations
          </a>
        </nav>

        <div className="mt-auto flex flex-col gap-1">
          <button className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold mb-4 hover:bg-emerald-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Donation
          </button>
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
            <Link href="/profile" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              JD
            </div>
            </Link>
            
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 font-medium">Active Donations</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                <TrendingUp className="w-3 h-3" />
                +1 since yesterday
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 font-medium">Meals Shared</span>
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Soup className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-amber-600 mb-1">450</div>
              <div className="text-xs text-gray-400">Lifetime Impact</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 font-medium">Shelters Supported</span>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">12</div>
              <div className="text-xs text-gray-400">Across 5 districts</div>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left column */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <div className="bg-emerald-600 rounded-xl p-5 text-white">
                <h3 className="text-lg font-bold mb-2">Ready to share?</h3>
                <p className="text-sm text-emerald-50 leading-relaxed mb-5">
                  Submit your excess inventory and our logistics team will handle the rest.
                </p>
                <button className="bg-white text-emerald-700 text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-emerald-50 transition-colors">
                  Donate Food
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Insights</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Recycle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">CO2 Saved</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">12.5kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Croissant className="w-4 h-4 text-amber-600" />
                      <span className="text-sm">Most Donated</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">Bakery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Live Trackings</h3>
                <a href="#" className="text-sm text-emerald-600 font-medium hover:underline">
                  View all history
                </a>
              </div>

              <div className="flex flex-col gap-4">
                {/* Tracking 1 */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <ChartColumn className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">
                          Assorted Pastries & Bread
                        </div>
                        <div className="text-xs text-gray-400">Batch #VO-294 · 15.5kg</div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Volunteer Assigned
                    </span>
                  </div>

                  <div className="h-1.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }} />
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
                      <span className="text-xs text-gray-500">Marcus Chen · ETA 12 mins</span>
                    </div>
                    <MessageSquare className="w-4 h-4 text-gray-300" />
                  </div>
                </div>

                {/* Tracking 2 */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
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
      </div>
    </div>
  );
}