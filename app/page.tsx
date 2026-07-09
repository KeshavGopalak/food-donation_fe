import HeroSection from "@/Home/HeroSection";
import Boxes from "@/Home/Boxes";
import Cards from "@/Home/Cards";
import GetStarted from "@/Home/GetStarted";
import Navbar from "@/Home/NavBar";
import Footer from "@/Home/Footer";

export default function Home() {
  return (
    <div className="font-inter">
      <Navbar />
      <HeroSection />
      <Boxes />
      <Cards />
      <GetStarted />
      <Footer />
    </div>
  );
}

