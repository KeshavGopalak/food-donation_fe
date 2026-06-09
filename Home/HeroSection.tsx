import { LuBadgeCheck } from "react-icons/lu";

export default function HeroSection() {
  return (
    <div className="main w-full h-screen  gap-10 font-inter">
      <div className="w-[40%] h-screen flex flex-col items-center justify-center gap-3 ml-5 font-inter">
        <div className="label bg-[#10B98133] text-darkgreen px-2 py-1 rounded-lg mr-auto flex items-center justify-center gap-1">
          <LuBadgeCheck className="inline-block w-6 mr-2" />
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
        <div className="text-2xl w-30% mb-10">
          Bridging the gap between surplus food and those who need it most. Our
          intelligent logistics platform connects donors, volunteers, and
          shelters in real-time.
        </div>
        <div className="button flex gap-6 mr-auto">
          <button className="bg-[#006C49] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#00563B] transition duration-300">
            Start Donating
          </button>
          <button className="bg-[#FFFFFF] text-[#006C49] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#C0C0C0] transition duration-300 border border-[#006C49]">
            Become a Volunteer
          </button>
        </div>
      </div>

      <div className="info">
        <div className="boxes flex flex-row gap-4 items-center justify-center">
          <div className="green w-200 h-50 bg-[#10B981] rounded-4xl flex flex-col  justify-center">

            <span className="font-bold">1.2M+</span>
            <span>Meals Saved & Redistributed</span>
            <span className="">Join 5,000+ active change-makers</span>

          </div>

          <div className="orange w-100 h-50 bg-[#F59E0B] rounded-4xl flex flex-col items-center justify-center">

            <span className="font-bold">842</span>
            <span>Deliveries Today</span>

          </div>

        </div>
      </div>
    </div>
  );
}
