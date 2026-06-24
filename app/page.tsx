import { Button } from "@/components/ui/button";
import HeroSection from "@/Home/HeroSection";
import Navbar from "@/Home/NavBar";
import { Bell, UserPen } from "lucide-react";
import Image from "next/image";
import Boxes from "@/Home/Boxes";
import Cards from "@/Home/Cards";
import GetStarted from "@/Home/GetStarted";
import Footer from "@/Home/Footer";

export default function Home() {
 
  return (
    <div className="font-inter">
    <Navbar/>
    <HeroSection />
    <Boxes />
    <Cards />
    <GetStarted />
    <Footer />
    </div>
  );
}

