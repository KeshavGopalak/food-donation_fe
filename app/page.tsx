import HeroSection from "@/components/pages/Home/HeroSection";
import Boxes from "@/components/pages/Home/Boxes";
import Cards from "@/components/pages/Home/Cards";
import GetStarted from "@/components/pages/Home/GetStarted";
import Navbar from "@/components/pages/Home/NavBar";
import Footer from "@/components/pages/Home/Footer";

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

