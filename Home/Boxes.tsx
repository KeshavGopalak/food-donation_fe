import { Truck } from "lucide-react";
import Image from "next/image";
import BgImage2 from "../public/37fb07bccbf315b4318b1d18780f8b2a5cfe7e97.png";


export default function Boxes() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-8 font-inter py-12 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Stats Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">
        {/* Green Box */}
        <div className="bg-[#10B981] rounded-3xl md:rounded-4xl flex flex-col justify-center p-6 md:p-8 gap-6 md:gap-10 text-white">
          <div className="flex flex-col items-start gap-1">
            <span className="font-medium text-2xl sm:text-3xl md:text-4xl">1.2M+</span>
            <span className="text-sm md:text-base">Meals Saved & Redistributed</span>
          </div>
          <span className="text-xs md:text-sm">Join 5,000+ active change-makers</span>
        </div>

        {/* Orange Box */}
        <div className="bg-[#F59E0B] rounded-3xl md:rounded-4xl flex flex-col items-center justify-center p-6 md:p-8 gap-3 text-white">
          <Truck className="w-12 h-12 md:w-16 md:h-16 p-3 md:p-4 rounded-full bg-[#d38b0e]" />
          <span className="font-bold text-xl md:text-2xl">842</span>
          <span className="text-sm md:text-base">Deliveries Today</span>
        </div>
      </div>

      {/* Footprint Box */}
      <div className="bg-[#EFF4FF] rounded-3xl md:rounded-4xl flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 p-6 md:p-8 border border-[#BBCABF] w-full max-w-5xl">
        <div className="flex flex-col gap-4 md:gap-5 lg:max-w-md">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Our Local Footprint</h3>
          <p className="text-sm md:text-base font-medium text-gray-600 leading-relaxed">
            We operate across 45 major urban centers, ensuring no edible food goes to waste while people are hungry.
          </p>
        </div>
        <div className="w-full lg:w-auto h-40 md:h-48 lg:h-40 rounded-2xl overflow-hidden shrink-0">
          <Image
            src={BgImage2}
            alt="Footprint Map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}