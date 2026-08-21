"use client";

import {
  LayoutGrid,
  LogOut,
  Bell,
  LocateIcon,
  MapPinned
} from 'lucide-react';
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const deleteLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  const handleLogout = () => {
    deleteLocalStorageItem('user');
    deleteLocalStorageItem('authToken');
    document.cookie = 'session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    document.cookie = 'session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasSession = !!localStorage.getItem('authToken') || document.cookie
      .split('; ')
      .some((cookie) => cookie.startsWith('session_id=') || cookie.startsWith('session_token='));

    if (!hasSession) {
      const loginUrl = new URL('/login', window.location.origin);
      loginUrl.searchParams.set('callbackUrl', window.location.pathname);
      router.replace(loginUrl.pathname + loginUrl.search);
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.role === 'admin' || parsedUser?.role === 'user') {
          router.replace(parsedUser.role === 'admin' ? '/admindb/dashboard' : '/userdb/dashboard');
          return;
        }
        window.setTimeout(() => setUserName(parsedUser?.name ?? null), 0);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        window.setTimeout(() => setUserName(null), 0);
      }
    }

    window.setTimeout(() => setIsChecking(false), 0);
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600 mx-auto" />
          <p className="mt-4 text-sm font-medium text-gray-600">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50/60 flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-linear-to-b from-sky-950 via-cyan-950 to-sky-900 shrink-0 flex flex-col p-5">
        <div className="flex items-center gap-3 px-1 py-2 mb-10">
          <div className="w-10 h-10 rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-200/20 flex items-center justify-center shrink-0">
            <MapPinned className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-white font-semibold text-sm">Vitality Hub</div>
            <div className="text-sky-300 text-xs">Logistics Panel</div>
          </div>
        </div>

        <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/60">Dispatch</div>
        <nav className="flex flex-col gap-2">
          <Link
            href="/volunteerdb/dashboard"
            aria-current={pathname === '/volunteerdb/dashboard' ? 'page' : undefined}
            className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium transition-all ${pathname === '/volunteerdb/dashboard' ? 'bg-cyan-400 text-sky-950 shadow-lg shadow-sky-950/30' : 'text-cyan-100/75 hover:bg-white/10 hover:text-white'}`}
          >
            <LayoutGrid className="w-4 h-4" />
            Overview
          </Link>
          <Link
            href="/volunteerdb/nearby-requests"
            aria-current={pathname.startsWith('/volunteerdb/nearby-requests') ? 'page' : undefined}
            className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium transition-all ${pathname.startsWith('/volunteerdb/nearby-requests') ? 'bg-cyan-400 text-sky-950 shadow-lg shadow-sky-950/30' : 'text-cyan-100/75 hover:bg-white/10 hover:text-white'}`}
          >
            <LocateIcon className="w-4 h-4" />
            Nearby Requests
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-cyan-200/15 pt-4">
          <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-3 text-xs text-cyan-50">
            <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_0_4px_rgba(190,242,100,0.12)]" />
            Available to help
          </div>
          <Link href="/" onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-red-200 text-sm hover:bg-white/10 transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white/90 border-b border-sky-100 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-bold text-gray-900">Vitality Logistics</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <Link href="/profile" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
            </Link>
            
          </div>
        </header>

        {children}

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