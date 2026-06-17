import { Button } from "@/components/ui/button";
import HeroSection from "@/Home/HeroSection";
import Navbar from "@/Home/NavBar";
import { Bell, UserPen } from "lucide-react";
import Image from "next/image";
import Boxes from "@/Home/Boxes";
import Cards from "@/Home/Cards";

export default function Home() {
 
  return (
    <>
    <Navbar />
    <HeroSection />
    <Boxes />
    <Cards />
    </>
  );
}

