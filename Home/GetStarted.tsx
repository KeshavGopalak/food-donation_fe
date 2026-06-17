export default function GetStarted() {
  return (
    <>
      <div className="main w-305 h-100 gap-10 font-inter bg-[#27313F] rounded-4xl flex flex-col items-start justify-center mt-20 mb-20 pl-10 mx-auto">
          <div className="flex items-center font-bold w-full text-5xl text-textwhite">
            Ready to Make a Difference? <br />
          </div>

        <div className="text-xl w-200 mb-10 mr-auto text-textwhite font-normal">
          Whether you're a business with surplus or an individual with a heart
          to serve, there's a place for you in our redistribution network.
        </div>
        <div className="button flex gap-6 mr-auto">
          <button className="bg-[#10B981] text-[#00422B] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#00563B] transition duration-300">
            Get Started Today
          </button>
          <button className="bg-[#ffffff00] text-textwhite px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#C0C0C0] transition duration-300 border border-[#6C7A71]">
            Contact Our Team
          </button>
        </div>
      </div>
    </>
  );
}
