

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, BarChart2, Plus, HelpCircle, LogOut, Bell, Activity, MapPin, UtensilsCrossed } from "lucide-react";

export default function Layout({ activePage, pageTitle, children }: { activePage: string; pageTitle: string; children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user?.role !== "admin") {
        router.replace(user?.role === "volunteer" ? "/volunteerdashboard" : "/userdashboard/dashboard");
        return;
      }
      setIsChecking(false);
    } catch {
      router.replace("/login");
    }
  }, [router]);

  if (isChecking) return <div className="min-h-screen bg-slate-50" />;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

          <main className="flex-1 bg-slate-100 p-6 lg:p-8">{children}</main>

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