import Image from "next/image";
import image3 from "../public/5728e622726249677769fd660f07b0f42ef57201.png"
export default function LoginInfo() {
  return (
    <div className="hidden lg:flex flex-1 flex-col justify-between bg-linear-to-b from-gray-900 to-gray-800 text-textwhite p-12 relative overflow-hidden h-full">
      {/* Background Image Overlay */}
      <Image
        className="inset-0 bg-cover absolute top-0 left-0 w-full h-full object-cover opacity-5"
        src={image3}
        alt="Background"
      />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-center">
        {/* Mission Badge */}
        <div className="inline-block bg-textgreen text-darkgreen font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider mb-6">
          OUR MISSION
        </div>

        {/* Mission Title */}
        <h2 className="text-4xl font-bold mb-6 leading-tight max-w-lg">
          Bridging the gap between surplus and scarcity.
        </h2>

        {/* Mission Description */}
        <p className="text-gray-300 text-base leading-relaxed max-w-md">
          Empowering communities through efficient logistics and compassionate distribution. We turn food waste into food security for thousands every day.
        </p>
      </div>
    </div>
  );
}