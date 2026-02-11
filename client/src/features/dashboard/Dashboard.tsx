import { DashboardSidebar } from "@/components/sidebar-02/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

function DashboardContent() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarInset className="flex flex-col">
      {isCollapsed && (
        <div className="p-3">
          <SidebarTrigger />
        </div>
      )}
    </SidebarInset>
  );
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="relative flex h-dvh w-full">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </SidebarProvider>
  );
}
