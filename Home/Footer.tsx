import { Globe, Share2 } from "lucide-react";
import { Share } from "next/font/google";
import { RiGlobalFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="w-full bg-[#EFF4FF] border-t border-[#E5E7EB]">
      <div className="flex flex-col gap-6 md:gap-8 p-6 sm:p-8 md:p-12 max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs md:text-sm font-medium text-gray-600">
              © 2024 Food Donation. All rights reserved.
            </p>
            <p className="text-xs md:text-sm font-medium text-gray-600">
              Made with ❤️ by the Food Donation Team.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm">
            <a href="mailto:info@fooddonation.org" className="text-blue-600 hover:underline transition">
              Contact Us
            </a>
            <a href="/faq" className="text-blue-600 hover:underline transition">
              FAQ
            </a>
            <a href="/about" className="text-blue-600 hover:underline transition">
              About
            </a>
            <a href="/tos" className="text-blue-600 hover:underline transition">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 md:gap-6 pt-4 border-t border-gray-300">
          <p className="text-xs md:text-sm text-gray-600 font-medium">Follow Us</p>
          <div className="flex gap-3">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition p-2 hover:bg-white rounded-lg">
              <Globe size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition p-2 hover:bg-white rounded-lg">
              <Share2 size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
