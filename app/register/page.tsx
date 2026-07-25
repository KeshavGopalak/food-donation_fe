
import RegisterForm from "@/auth/RegisterForm";
import LoginInfo from "@/auth/Info";

import Navbar from "@/Home/NavBar";

export default function Register() {
  return (
    <div className="font-inter flex min-h-screen flex-col bg-white">
      
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex-1 flex items-center justify-center px-4 py-12 lg:py-0 w-full">
          <RegisterForm />
        </div>

        <div className="hidden lg:flex flex-1">
          <LoginInfo />
        </div>
      </div>

    </div>
  );
}
