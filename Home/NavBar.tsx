
import { Bell, UserPen } from "lucide-react";


export default function Navbar() {
 
  return (
   <>
  <nav className="w-full flex items-center p-5 border-b-2 border-gray-200 bg-[#FFFFFF]">
    <span className=" flex items-center justify-between w-1/4 ml-5">  
    <h1 className="text-3l font-bold text-[#006C49] text-xl">Vitality logistics</h1>
    <p className=" text-[#006C49] underline font-bold">dashboard</p>
    <p className="">Impact</p>
    <p className="">Community</p>
    </span>
    
    <span className=" flex items-center justify-around w-1/8 ml-auto">
       <p className=" text-[#006C49]">Role Switcher</p>
       <span className="flex items-center gap-2">
        <Bell />
    <UserPen />
       </span>
    
    </span>
  

  </nav>
   </>
    
  );
}

