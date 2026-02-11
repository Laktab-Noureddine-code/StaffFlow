import { cn } from "@/lib/utils";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

type StatusBadgeProps = {
  label: string;
  variant?: BadgeVariant;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-600 border-emerald-200",
  warning: "bg-amber-50 text-amber-600 border-amber-200",
  danger: "bg-red-50 text-red-600 border-red-200",
  info: "bg-blue-50 text-blue-600 border-blue-200",
  neutral: "bg-gray-50 text-gray-600 border-gray-200",
};

export default function StatusBadge({ label, variant = "neutral", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
