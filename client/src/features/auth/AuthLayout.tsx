import Logo from "@/components/shared/Logo";
import authImage from "../../assets/auth/auth.webp";

interface AuthLayoutProps {
  children: React.ReactNode;
}
function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="max-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#121828] relative flex-col overflow-hidden">
        {/* Image container */}
        <div className="flex-1 min-h-0">
          <img
            src={authImage}
            alt="Team collaboration"
            className="w-full h-full object-cover "
          />
        </div>

        {/* Text content */}
        <div className="px-8 py-8 space-y-4 border-t-4 border-app">
          <div className="flex items-center gap-2">
            <Logo textColor="text-white" />
          </div>
          <h1 className="text-white text-3xl md:text-[2.5rem] font-semibold leading-tight">
            Let's empower your
            <br />
            employees today.
          </h1>
          <p className="text-gray-400 text-sm">
            We help to complete all your conveyancing needs easily
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen bg-white relative">
        {/* Main content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Footer */}
        <footer className="p-4 text-center text-xs text-gray-500">
          © 2026 NessHR. All rights reserved.{" "}
          <a href="#" className="text-cyan-600 hover:underline">
            Terms & Conditions
          </a>{" "}
          <a href="#" className="text-cyan-600 hover:underline">
            Privacy Policy
          </a>
        </footer>
      </div>
    </div>
  );
}

export default AuthLayout;
