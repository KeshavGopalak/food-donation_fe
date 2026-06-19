import { Truck } from "lucide-react";
import Image from "next/image";
import BgImage2 from "../public/37fb07bccbf315b4318b1d18780f8b2a5cfe7e97.png";


export default function Boxes() {
  return (
    <>
      <div className="info w-full flex flex-col items-center justify-center gap-5 font-inter mt-20 mb-20">
        <div className="boxes flex flex-row gap-4 items-center justify-center">
          <div className="green w-200 h-50 bg-[#10B981] rounded-4xl flex flex-col pl-10 justify-center gap-10">
            <div className="g1 flex flex-col items-start gap-1">
              <span className="font-medium text-4xl">1.2M+</span>
              <span>Meals Saved & Redistributed</span>
            </div>

            <span className="text-xs mt-5 ml-10">
              Join 5,000+ active change-makers
            </span>
          </div>

          <div className="orange w-100 h-50 bg-[#F59E0B] rounded-4xl flex flex-col items-center justify-center">
            <Truck className="w-15 h-15 p-4 rounded-full bg-[#d38b0e]" />
            <span className="font-bold">842</span>
            <span>Deliveries Today</span>
          </div>
        </div>

        <div className="white w-305 h-50 bg-[#EFF4FF] rounded-4xl flex flex-row items-start justify-around gap-2 border border-[#BBCABF]">
          <div className="flex flex-col gap-5 pl-5 mt-auto mb-auto mr-5">
            <span className="rounded-full flex items-center justify-center mr-auto  text-2xl font-bold">
              Our Local Footprint
            </span>
            <span className="text-sm font-medium w-130 text-gray-600">
              We operate across 45 major urban centers, ensuring no edible food
              goes to waste while people are hungry.
            </span>
          </div>
          <div className="whiteimg w-150 h-40 rounded-2xl mr-5 overflow-hidden flex items-center justify-center flex-row mt-auto mb-auto">
            <Image
              src={BgImage2}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
    
    );
}