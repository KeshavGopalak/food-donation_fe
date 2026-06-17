import { BadgeCheck, Truck } from "lucide-react";
import BgImage from "../public/4d25b8ac71caeaac3ebc624c453ba1c8ed833c5d.png";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="main w-full h-screen  gap-10 font-inter">
      <div className="w-full h-screen flex flex-col items-center justify-center gap-3 ml-5 font-inter bg-linear-to-r from-[#F9FAFB] via-[#F9FAFBE5] to-[#F9FAFB00]">
        <Image
          src={BgImage}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-3"
        />
        <div className="label bg-[#10B98133] text-darkgreen px-2 py-1 rounded-lg mr-auto flex items-center justify-center gap-1">
          <BadgeCheck className="inline-block w-6 mr-2" />
          <span className="text-xs font-bold uppercase flex flex-col items-center">
            Live Redistribution Active
          </span>
        </div>

        <div className="flex items-center font-bold w-full text-7xl">
          <span>
            Turn <span className="text-darkgreen font-inter">Waste</span> into
            <br />
            Warmth.
          </span>
        </div>
        <div className="text-2xl w-200 mb-10 mr-auto">
          Bridging the gap between surplus food and those who need it most. Our
          intelligent logistics platform connects donors, volunteers, and
          shelters in real-time.
        </div>
        <div className="button flex gap-6 mr-auto">
          <button className="bg-darkgreen text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#00563B] transition duration-300">
            Start Donating
          </button>
          <button className="bg-[#FFFFFF] text-darkgreen px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#C0C0C0] transition duration-300 border border-darkgreen">
            Become a Volunteer
          </button>
        </div>
      </div>



      

    </div>
  );
}
