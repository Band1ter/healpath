"use client";
import { useState } from "react";
import Link from "next/link";
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

      {/* Many ways to get help banner */}
      <div className="bg-[#1A1030] border border-[#3D2B6B] rounded-2xl p-5 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        </div>
        <div>
          <p className="text-[#F0EBF8] text-sm font-medium mb-0.5">
            Calling 911 is one option — not the only one.
          </p>
          <p className="text-[#9B8AC4] text-xs leading-relaxed">
            You can text a hotline, chat online, read your legal rights privately, or walk into a local center. Every path is valid. Choose what feels safest for you.
          </p>
        </div>
      </div>

      {/* Teen dating violence callout */}
      <Link
        href="https://njcedv.org/teen-dating-violence/"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-[#2e1a28] border border-[#EC4899]/30 hover:border-[#EC4899] rounded-2xl p-5 mb-6 transition-colors group"
      >
        <div className="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EC4899" className="w-5 h-5 shrink-0 mt-0.5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          <div>
            <p className="text-[#EC4899] text-sm font-semibold mb-1 group-hover:underline">
              Are you a teenager? This applies to you too.
            </p>
            <p className="text-[#9B8AC4] text-xs leading-relaxed">
              Dating violence happens at every age. If something in your relationship feels wrong — controlling behavior, pressure, fear — that matters. You deserve safety and support just as much as anyone else. Tap to learn more →
            </p>
          </div>
        </div>
      </Link>

      <ResourceFilters filters={filters} onFilterChange={setFilters} />

      <p className="text-sm text-[#9B8AC4] mb-4">
        {filtered.length} resource{filtered.length !== 1 ? "s" : ""} found
      </p>

      <ResourceGrid resources={filtered} />
    </div>
  );
}
