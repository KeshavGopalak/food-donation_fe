import { Truck } from "lucide-react";
import Image from "next/image";
import BgImage2 from "@/public/37fb07bccbf315b4318b1d18780f8b2a5cfe7e97.png";
import { Badge } from "@/components/ui/badge";


export default function Boxes() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-8 font-inter py-12 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Stats Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">
        {/* Green Box */}
        <div className="bg-linear-to-br from-emerald-600 to-emerald-700 rounded-3xl md:rounded-4xl flex flex-col justify-center p-6 md:p-8 gap-6 md:gap-10 text-white shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-1">
              <span className="font-bold text-3xl sm:text-4xl md:text-5xl">1.2M+</span>
              <span className="text-sm md:text-base font-medium">Meals Saved & Redistributed</span>
            </div>
            <Badge variant="success" className="bg-white/20 text-white border-white/30">
              Active
            </Badge>
          </div>
          <span className="text-xs md:text-sm opacity-90">Join 5,000+ active change-makers today</span>
        </div>

        {/* Orange Box */}
        <div className="bg-linear-to-br from-amber-500 to-amber-600 rounded-3xl md:rounded-4xl flex flex-col items-center justify-center p-6 md:p-8 gap-3 text-white shadow-md hover:shadow-lg transition-all duration-300">
          <Truck className="w-12 h-12 md:w-16 md:h-16 p-3 md:p-4 rounded-full bg-white/20" />
          <span className="font-bold text-2xl md:text-3xl">842</span>
          <span className="text-sm md:text-base font-medium">Deliveries Today</span>
          <Badge variant="info" className="mt-2">
            Real-time
          </Badge>
        </div>
      </div>

      {/* Footprint Box */}
      <div className="bg-linear-to-r from-blue-50 to-emerald-50 rounded-3xl md:rounded-4xl flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 p-6 md:p-8 border border-emerald-200 w-full max-w-5xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-col gap-4 md:gap-5 lg:max-w-md">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Our Local Footprint</h3>
            <Badge variant="success">45 Cities</Badge>
          </div>
          <p className="text-sm md:text-base font-medium text-gray-600 leading-relaxed">
            We operate across 45 major urban centers, ensuring no edible food goes to waste while people are hungry.
          </p>
        </div>
        <div className="w-full lg:w-auto h-40 md:h-48 lg:h-40 rounded-2xl overflow-hidden shrink-0 shadow-md">
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