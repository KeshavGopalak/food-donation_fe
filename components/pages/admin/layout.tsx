

import Link from "next/link";
import { Users, BarChart2, Plus, HelpCircle, LogOut, Bell, Activity, MapPin, UtensilsCrossed } from "lucide-react";

export default function Layout({ activePage, pageTitle, children }: { activePage: string; pageTitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex flex-1">
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

        <nav className="mt-4 px-3 flex flex-col gap-1">
              <SidebarLink
                href="/admin-dashboard"
                icon={<Users className="w-4 h-4" />}
                label="Users"
                active={activePage === "admin-dashboard"}
              />
              <SidebarLink
                href="/admin-analytics"
                icon={<BarChart2 className="w-4 h-4" />}
                label="Analytics"
                active={activePage === "admin-analytics"}
              />
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
        <div className="flex-1 flex flex-col">
          {/* Top navbar — identical on every page */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
            <h1 className="text-lg font-semibold text-emerald-700">{pageTitle}</h1>
            <div className="flex items-center gap-4">
              <button
                aria-label="Notifications"
                className="relative text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500" />
              </button>
              <div className="w-px h-6 bg-slate-200" />
              <button className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Admin View</span>
                <img
                  src="https://i.pravatar.cc/64?img=12"
                  alt="Admin avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
            </div>
          </header>

          {/* Page-specific content */}
          <main className="flex-1 p-8">{children}</main>

          {/* Footer — identical on every page */}
          <footer className="border-t border-slate-200 bg-white px-8 py-6 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <Activity className="w-4 h-4" />
              Vitality Logistics
              <span className="text-slate-400 font-normal ml-2">
                © 2024 Vitality Food Redistribution Platform. Delivering Care and Precision.
              </span>
            </div>
            <nav className="flex items-center gap-6 text-slate-500">
              <Link href="/faq" className="hover:text-slate-700">FAQ</Link>
              <Link href="/contact" className="hover:text-slate-700">Contact</Link>
              <Link href="/about" className="hover:text-slate-700">About</Link>
              <Link href="/privacy" className="hover:text-slate-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-700">Terms of Service</Link>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ href, icon, label, active } : { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-emerald-600 text-white"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}