import { DashboardSidebar } from "@/components/sidebar-02/app-sidebar";
import DashboardNavbar from "@/components/shared/DashboardNavbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarInset className="flex flex-col">
      <div className="flex items-center">
        {isCollapsed && (
          <div className="px-3">
            <SidebarTrigger />
          </div>
        )}
        <div className="flex-1">
          <DashboardNavbar />
        </div>
      </div>
      {/* Page content goes here */}
      <div className="flex-1 p-4 bg-gray-50">
        {children}
      </div>
    </SidebarInset>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="relative flex w-full">
        <DashboardSidebar />
        <DashboardContent>
          <Outlet/>
        </DashboardContent>
      </div>
    </SidebarProvider>
  );
}
