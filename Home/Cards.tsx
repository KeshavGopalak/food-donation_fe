import Doctor from "../public/doctor.png";
import truckmap from "../public/truckmap.png";
import farmer from "../public/farmer.png";
import Image from "next/image";
import { cardtext } from "@/Constants/CardsText";
export default function Cards() {
  return (
    <>
    <div className="seamless w-full flex flex-col items-center justify-center gap-10 mt-20 font-inter">
        <div className="title flex flex-col items-center justify-center gap-3">
          <div className="text-4xl font-bold text-center">
            Seamless Food Rescue, One Click Away
          </div>
          <span className="text-sm text-gray-600 mt-2 text-center">
            Our user-friendly platform makes it easy for donors, volunteers, and
            shelters to connect and coordinate food rescue efforts in real-time.
          </span>
        </div>

 
      
        
         <div className="cards flex flex-row items-center justify-center gap-10 mt-10 w-300">
          {cardtext.map((card) => (
            <div className="card bg-textcream rounded-2xl p-6 flex flex-col items-center gap-4 border border-[#E5E7EB] ">
              <div className="cardimage w-50 h-60 flex items-center justify-center">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={300}
                  height={160}
                  className="w-300 h-40 object-cover"
                />
              </div>
              <div className="cardtext">
                <div className="text-lg font-bold">{card.title}</div>
                <div className="text-sm text-gray-600">
                  {card.description}
                </div>
              </div>
            </div>
          ))}
               
            
            </div>
        </div>
    </>
    );
}