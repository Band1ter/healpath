import { Resource } from "@/types/resource";

const CATEGORY_LABELS: Record<Resource["category"], string> = {
  hotline: "Hotline",
  legal: "Legal Aid",
  medical: "Medical / SANE",
  shelter: "Shelter",
};

const CATEGORY_COLORS: Record<Resource["category"], { bg: string; text: string }> = {
  hotline:  { bg: "#241840", text: "#A78BFA" },
  legal:    { bg: "#1a2e1a", text: "#34D399" },
  medical:  { bg: "#1a2434", text: "#60a5fa" },
  shelter:  { bg: "#2e1a28", text: "#EC4899" },
};

const LOCATION_LABELS: Record<Resource["location"], string> = {
  nyc: "NYC",
  nj: "NJ",
  national: "National",
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  const cat = CATEGORY_COLORS[resource.category];

  return (
    <div className="bg-[#1A1030] rounded-2xl border border-[#3D2B6B] p-5 hover:border-[#7C3AED] transition-colors flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <h3 className="font-heading font-semibold text-[#F0EBF8] text-base leading-snug">
          {resource.name}
        </h3>
        <div className="flex gap-1.5 flex-wrap">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.text }}
          >
            {CATEGORY_LABELS[resource.category]}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#241840] text-[#9B8AC4]">
            {LOCATION_LABELS[resource.location]}
          </span>
        </div>
      </div>

      <p className="text-sm text-[#9B8AC4] leading-relaxed">{resource.description}</p>

      <div className="flex flex-col gap-1.5 text-sm">
        {resource.phone && (
          <div className="flex items-center gap-2">
            <span className="text-[#3D2B6B] text-xs">Phone</span>
            <a
              href={`tel:${resource.phone.replace(/\D/g, "")}`}
              className="font-medium text-[#A78BFA] hover:text-white hover:underline transition-colors"
            >
              {resource.phone}
            </a>
          </div>
        )}
        {resource.address && (
          <div className="flex items-start gap-2">
            <span className="text-[#3D2B6B] text-xs pt-0.5">Address</span>
            <span className="text-[#9B8AC4] text-xs">{resource.address}</span>
          </div>
        )}
        {resource.hours && (
          <div className="flex items-center gap-2">
            <span className="text-[#3D2B6B] text-xs">Hours</span>
            <span className="text-[#9B8AC4] text-xs">{resource.hours}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-[#3D2B6B] text-xs">Cost</span>
          <span className="text-[#34D399] font-medium text-xs">{resource.cost}</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#3D2B6B]">
        <div className="flex gap-2 flex-wrap">
          {resource.teenFocused && (
            <span className="text-xs bg-[#2e1a28] text-[#EC4899] border border-[#EC4899]/30 px-2 py-0.5 rounded-full">
              Teen Resources
            </span>
          )}
          {resource.lgbtqFriendly && (
            <span className="text-xs bg-[#241840] text-[#A78BFA] border border-[#3D2B6B] px-2 py-0.5 rounded-full">
              LGBTQ+ Friendly
            </span>
          )}
          {resource.disabilityAccessible && (
            <span className="text-xs bg-[#1a2434] text-[#60a5fa] border border-[#3D2B6B] px-2 py-0.5 rounded-full">
              Disability Accessible
            </span>
          )}
          {resource.languages && resource.languages.length > 0 && (
            <span className="text-xs text-[#9B8AC4]">
              {resource.languages.slice(0, 3).join(", ")}
              {resource.languages.length > 3 ? ` +${resource.languages.length - 3} more` : ""}
            </span>
          )}
        </div>
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#A78BFA] hover:text-white hover:underline font-medium transition-colors"
          >
            Visit website →
          </a>
        )}
      </div>
    </div>
  );
}
