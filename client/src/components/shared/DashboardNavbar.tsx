import { Link } from "react-router-dom";
import { Mail, Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const navLinks = [
  { label: "Documents", to: "/dashboard/documents" },
  { label: "News", to: "/dashboard/news" },
  { label: "Payslip", to: "/dashboard/payslip" },
  { label: "Report", to: "/dashboard/report" },
];

export default function DashboardNavbar() {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      {/* Left: Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-9 w-56 border bg-transparent pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <kbd className="pointer-events-none ml-2 hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
            <span className="text-xs">⌘</span>F
          </kbd>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: Icons + Avatar */}
      <div className="flex items-center gap-3">
        <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
          <Mail className="size-5" />
        </button>
        <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
          <Bell className="size-5" />
        </button>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="text-xs">
            {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
