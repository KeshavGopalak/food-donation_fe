"use client";

import {
  UtensilsCrossed,
  LayoutGrid,
  Table2,
  Plus,
  HelpCircle,
  LogOut,
  Search,
  Bell
} from 'lucide-react';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const deleteLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
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
        if (parsedUser?.role === 'admin' || parsedUser?.role === 'volunteer') {
          router.replace(parsedUser.role === 'admin' ? '/admin-dashboard' : '/volunteerdashboard');
          return;
        }
        setUserName(parsedUser?.name ?? null);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        setUserName(null);
      }
    }

    setIsChecking(false);
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
            href="/userdashboard/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium"
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
          <Link href="/userdashboard/donations" className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold mb-4 hover:bg-emerald-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Donation
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-emerald-400 text-sm">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </a>
          <Link href="/" onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-red-400 text-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
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