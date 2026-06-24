export default function GetStarted() {
  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 md:py-20">
      <div className="w-full max-w-4xl bg-[#27313F] rounded-3xl md:rounded-4xl flex flex-col items-start justify-center gap-6 md:gap-8 p-6 sm:p-8 md:p-12 lg:p-16">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
          Ready to Make a Difference?
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl font-normal">
          Whether you're a business with surplus or an individual with a heart to serve, there's a place for you in our redistribution network.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 w-full sm:w-auto">
          <button className="bg-[#10B981] text-[#00422B] px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold hover:bg-[#0a9d63] transition duration-300 w-full sm:w-auto">
            Get Started Today
          </button>
          <button className="bg-transparent text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold hover:bg-[#37424f] transition duration-300 border border-[#6C7A71] w-full sm:w-auto">
            Contact Our Team
          </button>
        </div>
      </div>
    </div>
  );
}
