
import { Bell, UserPen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4 border-b-2 border-gray-200 bg-white">
      <div className="flex items-center gap-3 md:gap-6">
        <h1 className="text-lg md:text-2xl font-bold text-darkgreen">Vitality Logistics</h1>
        <div className="hidden md:flex items-center gap-4 ml-6">
          <p className="text-darkgreen underline font-bold text-sm md:text-base">Dashboard</p>
          <p className="text-gray-700 text-sm md:text-base">Impact</p>
          <p className="text-gray-700 text-sm md:text-base">Community</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <p className="hidden sm:block text-darkgreen text-sm md:text-base">Role Switcher</p>
        <div className="flex items-center gap-3 md:gap-4">
          <Bell size={20} className="md:w-6 md:h-6" />
          <UserPen size={20} className="md:w-6 md:h-6" />
        </div>
      </div>
    </nav>
  );
}

