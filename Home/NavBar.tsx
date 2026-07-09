"use client";

import { Bell, UserPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/impact", label: "Impact" },
  { href: "/community", label: "Community" },
  { href: "/donations", label: "Donations" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4 border-b-2 border-gray-200 bg-white font-inter">
      <div className="flex items-center gap-3 md:gap-6">
        <h1 className="text-lg md:text-2xl font-bold text-darkgreen">
          Vitality Logistics
        </h1>
        <div className="hidden md:flex items-center gap-4 ml-6">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                className={`text-sm md:text-base ${
                  isActive
                    ? "text-darkgreen underline font-bold"
                    : "text-gray-700 hover:text-darkgreen hover:underline"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
      
        <div className="flex items-center gap-3 md:gap-6">
          <p className="hidden sm:block text-darkgreen text-sm md:text-base">
            <Link href="/login" className="flex items-center gap-3 md:gap-6">Role Switcher</Link>
          </p>

          <Link href="/login" className="flex items-center gap-3 md:gap-4">
            <Bell size={20} className="md:w-6 md:h-6" />
            <UserPen size={20} className="md:w-6 md:h-6" />
          </Link>
        </div>
      
    </nav>
  );
}
