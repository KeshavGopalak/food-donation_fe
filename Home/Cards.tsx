import Doctor from "../public/doctor.png";
import truckmap from "../public/truckmap.png";
import farmer from "../public/farmer.png";
import Image from "next/image";
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
          <div className="card bg-[#F9FAFB] rounded-2xl p-6 flex flex-col items-center gap-4 border border-[#E5E7EB] ">
            <div className="cardimage w-50 h-60 flex items-center justify-center">
              <Image
                src={Doctor}
                alt="Background"
                className="w-300 h-40 object-cover"
              />
            </div>
            <div className="cardtext">
              <div className="text-lg font-bold">Post Surplus Food</div>
              <div className="text-sm text-gray-600">
                Restaurants, grocers, and caterers list excess food via our app
                in under 60 seconds.
              </div>
            </div>
          </div>

          <div className="card2 bg-[#F9FAFB] rounded-2xl p-6 flex flex-col items-center gap-4 border border-[#E5E7EB]">
            <div className="cardimage w-60 h-60 rounded-full bg-[#E5E7EB] flex items-center justify-center">
              <Image
                src={truckmap}
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="cardtext">
              <div className="text-lg font-bold">Accept & Deliver</div>
              <div className="text-sm text-gray-600">
                Volunteers receive notifications for nearby pickups and deliver
                them to designated shelters.
              </div>
            </div>
          </div>

          <div className="card3 bg-[#F9FAFB] rounded-2xl p-6 flex flex-col items-center gap-4 border border-[#E5E7EB]">
            <div className="cardimage w-60 h-60 rounded-full bg-[#E5E7EB] flex items-center justify-center">
              <Image
                src={farmer}
                alt="Background"
                className="w-full h-full object-cover "
              />
            </div>
            <div className="cardtext">
              <div className="text-lg font-bold">Receive & Serve</div>
              <div className="text-sm text-gray-600">
                Local non-profits and shelters receive fresh food to supplement
                their meal programs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
}