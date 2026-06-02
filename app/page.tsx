import { Button } from "@/components/ui/button";
import { Bell, UserPen } from "lucide-react";
import Image from "next/image";

export default function Home() {
 
  return (
   <>
  <nav className="w-full flex items-center mt-5">
    <h1 className="text-3l font-bold text-green-600">Vitality logistics</h1>
    <p className=" text-green-600 underline">dashboard</p>
    <p className="">impact</p>
    <p className="">community</p>
    <span className=" flex items-center justify-around w-1/5">
       <p className=" text-green-600">role switcher</p>
    <Bell />
    <UserPen />
    </span>
  

  </nav>
   </>
    
  );
}

