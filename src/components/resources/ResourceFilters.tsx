"use client";
import { clsx } from "clsx";

export interface FilterState {
  category: string;
  location: string;
}

interface ResourceFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "hotline", label: "Hotlines" },
  { value: "legal", label: "Legal Aid" },
  { value: "medical", label: "Medical / FNE / SANE" },
  { value: "shelter", label: "Shelter" },
];

const LOCATIONS = [
  { value: "all", label: "All Locations" },
  { value: "nj", label: "New Jersey" },
  { value: "nyc", label: "NYC" },
  { value: "national", label: "National" },
];

export default function ResourceFilters({ filters, onFilterChange }: ResourceFiltersProps) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange({ ...filters, category: value })}
            className={clsx(
              "px-4 py-1.5 rounded-xl text-sm font-medium border transition-[border-color,color,background] duration-150",
              filters.category === value
                ? "text-white border-[#9f7aea]"
                : "text-[#94a3b8] border-[#2a3555] hover:border-[#9f7aea] hover:text-[#c4b5fd]"
            )}
            style={
              filters.category === value
                ? { background: "linear-gradient(135deg, #9f7aea, #818cf8)" }
                : {}
            }
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {LOCATIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange({ ...filters, location: value })}
            className={clsx(
              "px-4 py-1.5 rounded-xl text-sm font-medium border transition-[border-color,color,background] duration-150",
              filters.location === value
                ? "bg-[#0f1e18] text-[#34D399] border-[#34D399]"
                : "text-[#94a3b8] border-[#2a3555] hover:border-[#34D399] hover:text-[#34D399]"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
