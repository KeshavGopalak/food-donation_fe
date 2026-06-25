import LoginNav from "@/login/Nav";
import LoginForm from "@/login/Form";
import LoginInfo from "@/login/Info";
import LoginFooter from "@/login/Footer";

export default function Login() {
  return (
    <div className="font-inter flex flex-col min-h-screen bg-textwhite">
      {/* Navigation */}
      <LoginNav />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 lg:py-0">
          <LoginForm />
        </div>

        {/* Right Side - Info */}
        <div className="flex-1">
          <LoginInfo />
        </div>
      </div>

      {/* Footer */}
      <LoginFooter />
    </div>
  );
}

