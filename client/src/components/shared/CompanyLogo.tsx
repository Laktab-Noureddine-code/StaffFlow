import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CompanyLogo({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
    const company = useSelector((state: any) => state.company.company);
  const companyName = company?.company_name ?? "";
  const logoUrl = company?.logo_url ?? "";
  const initials = companyName
    ? companyName.charAt(0).toUpperCase()
    : "C";

  return (
    <Link to="/" className="flex items-center gap-2.5 min-w-0">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={companyName}
          className="size-8 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-sm">
          {initials}
        </div>
      )}
      {!isCollapsed && (
        <span className="truncate text-sm font-semibold text-foreground">
          {companyName || "Company"}
        </span>
      )}
    </Link>
  );
}

export default CompanyLogo;
