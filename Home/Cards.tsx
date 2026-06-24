import Doctor from "../public/doctor.png";
import truckmap from "../public/truckmap.png";
import farmer from "../public/farmer.png";
import Image from "next/image";
import { cardtext } from "@/Constants/CardsText";
export default function Cards() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 md:gap-12 font-inter py-12 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center gap-3 md:gap-4 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight">
          Seamless Food Rescue, One Click Away
        </h2>
        <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
          Our user-friendly platform makes it easy for donors, volunteers, and shelters to connect and coordinate food rescue efforts in real-time.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
        {cardtext.map((card, index) => (
          <div key={index} className="bg-[#FEF9F3] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col gap-4 border border-[#E5E7EB] hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-40 md:h-48 overflow-hidden flex-shrink-0">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 md:p-6 flex flex-col gap-2">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">{card.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}