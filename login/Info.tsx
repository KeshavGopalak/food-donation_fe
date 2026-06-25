export default function LoginInfo() {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-linear-to-b from-gray-900 to-gray-800 text-textwhite p-12 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Crect fill=%22%23404040%22 width=%221200%22 height=%22600%22/%3E%3C/svg%3E')`,
          backgroundSize: 'cover',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
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

      {/* Footer */}
      <div className="relative z-10 text-gray-400 text-xs">
        © 2024 Vitality Logistics. Supporting global food redistribution.
      </div>
    </div>
  );
}