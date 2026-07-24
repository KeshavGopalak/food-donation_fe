import { Globe, Share2 } from "lucide-react";
import { Share } from "next/font/google";
import { RiGlobalFill } from "react-icons/ri";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#EFF4FF] border-t border-[#E5E7EB] shadow-sm">
      <div className="flex flex-col gap-6 md:gap-8 p-6 sm:p-8 md:p-12 max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs md:text-sm font-medium text-gray-600">
              © 2024 Food Donation. All rights reserved.
            </p>
            <p className="text-xs md:text-sm font-medium text-gray-600">
              Made by the Food Donation Team.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm">
            <a href="mailto:info@vitalitylogistics.com" className="text-emerald-600 hover:underline transition font-medium">
              Contact Us
            </a>
            <Link href="/faq" className="text-emerald-600 hover:underline transition font-medium">
              FAQ
            </Link>
            <Link href="/about" className="text-emerald-600 hover:underline transition font-medium">
              About
            </Link>
            <Link href="/tos" className="text-emerald-600 hover:underline transition font-medium">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 md:gap-6 pt-4 border-t border-gray-300">
          <p className="text-xs md:text-sm text-gray-600 font-medium">Follow Us</p>
          <div className="flex gap-3">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600 transition p-2 hover:bg-white rounded-lg transform hover:scale-110"
            >
              <Globe size={18} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600 transition p-2 hover:bg-white rounded-lg transform hover:scale-110"
            >
              <Share2 size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
