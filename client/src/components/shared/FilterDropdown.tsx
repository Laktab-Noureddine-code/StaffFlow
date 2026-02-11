import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterOption = {
  label: string;
  value: string;
};

type FilterDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  className?: string;
};

export default function FilterDropdown({
  value,
  onChange,
  options,
  placeholder = "All",
  className,
}: FilterDropdownProps) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-8 text-sm text-gray-700 outline-none transition-colors cursor-pointer focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
