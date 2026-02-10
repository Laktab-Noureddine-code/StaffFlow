import type { ReactNode } from "react";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";

function AppLayout({ children }: { children: ReactNode }) {
  const company = useSelector((state: any) => state.company);
  console.log(company);
  return (
    <div className="flex min-h-screen ">
      <div className="min-h-screen w-64 bg-gray-800 text-white">
        <img src="" alt="" />
      </div>
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
