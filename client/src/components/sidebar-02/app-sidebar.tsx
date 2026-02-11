"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  CalendarOff,
  CheckSquare,
  CircleHelp,
  ClipboardList,
  DollarSign,
  LayoutDashboard,
  Settings,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import type { Route } from "./nav-main";
import DashboardNavigation from "@/components/sidebar-02/nav-main";
import CompanyLogo from "../shared/CompanyLogo";

const dashboardRoutes: Route[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard className="size-4" />,
    link: "/dashboard",
  },
  {
    id: "employees",
    title: "Employees",
    icon: <Users className="size-4" />,
    link: "/dashboard/employees",
    subs: [
      { title: "All Employees", link: "/dashboard/employees" },
      { title: "Add Employee", link: "/dashboard/employees/add" },
    ],
  },
  {
    id: "checklist",
    title: "Checklist",
    icon: <CheckSquare className="size-4" />,
    link: "/dashboard/checklist",
    subs: [
      { title: "Onboarding", link: "/dashboard/checklist/onboarding" },
      { title: "Offboarding", link: "/dashboard/checklist/offboarding" },
    ],
  },
  {
    id: "time-off",
    title: "Time Off",
    icon: <CalendarOff className="size-4" />,
    link: "/dashboard/time-off",
    subs: [
      { title: "Requests", link: "/dashboard/time-off/requests" },
      { title: "Balances", link: "/dashboard/time-off/balances" },
    ],
  },
  {
    id: "attendance",
    title: "Attendance",
    icon: <UserCheck className="size-4" />,
    link: "/dashboard/attendance",
    subs: [
      { title: "Daily Log", link: "/dashboard/attendance/daily" },
      { title: "Reports", link: "/dashboard/attendance/reports" },
    ],
  },
  {
    id: "payroll",
    title: "Payroll",
    icon: <DollarSign className="size-4" />,
    link: "/dashboard/payroll",
    subs: [
      { title: "Payslips", link: "/dashboard/payroll/payslips" },
      { title: "Run Payroll", link: "/dashboard/payroll/run" },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    icon: <TrendingUp className="size-4" />,
    link: "/dashboard/performance",
    subs: [
      { title: "Reviews", link: "/dashboard/performance/reviews" },
      { title: "Goals", link: "/dashboard/performance/goals" },
    ],
  },
  {
    id: "recruitment",
    title: "Recruitment",
    icon: <ClipboardList className="size-4" />,
    link: "/dashboard/recruitment",
    subs: [
      { title: "Job Postings", link: "/dashboard/recruitment/jobs" },
      { title: "Candidates", link: "/dashboard/recruitment/candidates" },
    ],
  },
];

const footerRoutes: Route[] = [
  {
    id: "help-center",
    title: "Help Center",
    icon: <CircleHelp className="size-4" />,
    link: "/dashboard/help",
  },
  {
    id: "settings",
    title: "Setting",
    icon: <Settings className="size-4" />,
    link: "/dashboard/settings",
  },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="inset" collapsible="icon">
      {/* Header: Company logo + name + collapse trigger */}
      <SidebarHeader className="flex flex-row items-center justify-between px-3 py-4">
        <CompanyLogo
          isCollapsed={isCollapsed}
        />
        {!isCollapsed && <SidebarTrigger className="shrink-0" />}
      </SidebarHeader>

      {/* Main navigation */}
      <SidebarContent className="px-2 py-2">
        <DashboardNavigation routes={dashboardRoutes} />
      </SidebarContent>

      {/* Footer: Help Center, Settings */}
      <SidebarFooter className="px-2 pb-4">
        <SidebarSeparator />
        <DashboardNavigation routes={footerRoutes} />
      </SidebarFooter>
    </Sidebar>
  );
}
