import authImage from "../../assets/auth/auth.webp";

interface AuthLayoutProps {
  children: React.ReactNode;
}
function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="max-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#121828] relative flex-col justify-between overflow-hidden">
        {/* Image container */}
        <div className="flex-1 flex  max-h-[70vh]  justify-center">
          <div className="relative w-full">
            <img
              src={authImage}
              alt="Team collaboration"
              className="w-full h-auto max-h-[70vh] rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="mt-auto p-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-cyan-400 rounded flex items-center justify-center">
              <span className="text-[#121828] font-bold text-sm">H</span>
            </div>
            <span className="text-white font-semibold">HRDashboard</span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-3">
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
          © 2026 HRDashboard. All rights reserved.{" "}
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
