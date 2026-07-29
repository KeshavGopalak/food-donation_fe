import { BadgeCheck, Truck } from "lucide-react";
import BgImage from "@/public/4d25b8ac71caeaac3ebc624c453ba1c8ed833c5d.png";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen font-inter bg-white">
      <Image
        src={BgImage}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-5"
        priority
      />
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-4 sm:px-6 md:px-12 lg:px-16 py-10 md:py-20 gap-6 md:gap-8">
        <div className="label bg-[#10B98133] text-darkgreen px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center justify-center gap-2 text-xs md:text-sm">
          <BadgeCheck className="w-4 h-4 md:w-6 md:h-6" />
          <span className="font-bold uppercase">Live Redistribution Active</span>
        </div>

        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight md:leading-snug max-w-2xl md:max-w-4xl">
          Turn <span className="text-darkgreen">Waste</span> into
          <br />
          Warmth.
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-lg md:max-w-2xl leading-relaxed">
          Bridging the gap between surplus food and those who need it most. Our intelligent logistics platform connects donors, volunteers, and shelters in real-time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
          <Link 
            href="/donations"
            className="bg-darkgreen text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold hover:bg-[#00563B] transition duration-300 w-full sm:w-auto text-center"
          >
            Start Donating
          </Link>
          <Link
            href="/community"
            className="bg-white text-darkgreen px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold hover:bg-gray-100 transition duration-300 border-2 border-darkgreen w-full sm:w-auto text-center"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>
    </div>
  );
}
