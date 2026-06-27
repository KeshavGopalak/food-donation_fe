import LoginNav from "@/auth/Nav";
import LoginForm from "@/auth/Form";
import LoginInfo from "@/auth/Info";
import LoginFooter from "@/auth/Footer";

export default function Login() {
  return (
    <div className="font-inter flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <LoginNav />

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 lg:py-0 w-full">
          <LoginForm />
        </div>

        {/* Right Side - Info */}
        <div className="hidden lg:flex flex-1">
          <LoginInfo />
        </div>
      </div>

      {/* Footer */}
      <LoginFooter />
    </div>
  );
}

