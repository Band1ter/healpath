"use client";
import { useState } from "react";
import { resources } from "@/lib/resources-data";
import ResourceFilters, { FilterState } from "@/components/resources/ResourceFilters";
import ResourceGrid from "@/components/resources/ResourceGrid";

export default function ResourcesPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    location: "all",
  });

  const filtered = resources.filter((r) => {
    const categoryMatch = filters.category === "all" || r.category === filters.category;
    const locationMatch = filters.location === "all" || r.location === filters.location;
    return categoryMatch && locationMatch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 pb-16">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-semibold text-[#F0EBF8] mb-2">
          Free help near you
        </h1>
        <p className="text-[#9B8AC4] leading-relaxed max-w-2xl">
          Every resource listed here is free or low-cost. You do not need a police
          report. Many do not require ID. You are in control of how and when you reach out.
        </p>
      </div>

      <ResourceFilters filters={filters} onFilterChange={setFilters} />

      <p className="text-sm text-[#9B8AC4] mb-4">
        {filtered.length} resource{filtered.length !== 1 ? "s" : ""} found
      </p>

      <ResourceGrid resources={filtered} />
    </div>
  );
}
