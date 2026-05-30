import { Resource } from "@/types/resource";

const CATEGORY_LABELS: Record<Resource["category"], string> = {
  hotline: "Hotline",
  legal: "Legal Aid",
  medical: "Medical / SANE",
  shelter: "Shelter",
};

const CATEGORY_COLORS: Record<Resource["category"], { bg: string; text: string }> = {
  hotline:  { bg: "#1c2444", text: "#c4b5fd" },
  legal:    { bg: "#0f1e18", text: "#34D399" },
  medical:  { bg: "#0f1e2e", text: "#60a5fa" },
  shelter:  { bg: "#1e0f1a", text: "#f472b6" },
};

const LOCATION_LABELS: Record<Resource["location"], string> = {
  nyc: "NYC",
  nj: "NJ",
  national: "National",
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  const cat = CATEGORY_COLORS[resource.category];

  return (
    <div className="bg-[#131b2e] rounded-2xl border border-[#2a3555] p-5 hover:border-[#9f7aea] card-lift flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <h3 className="font-heading font-semibold text-[#f1f5f9] text-base leading-snug">
          {resource.name}
        </h3>
        <div className="flex gap-1.5 flex-wrap">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.text }}
          >
            {CATEGORY_LABELS[resource.category]}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#1c2640] text-[#94a3b8]">
            {LOCATION_LABELS[resource.location]}
          </span>
        </div>
      </div>

      <p className="text-sm text-[#94a3b8] leading-relaxed">{resource.description}</p>

      <div className="flex flex-col gap-1.5 text-sm">
        {resource.phone && (
          <div className="flex items-center gap-2">
            <span className="text-[#2a3555] text-xs">Phone</span>
            <a
              href={`tel:${resource.phone.replace(/\D/g, "")}`}
              className="font-medium text-[#c4b5fd] hover:text-white hover:underline transition-colors duration-150"
            >
              {resource.phone}
            </a>
          </div>
        )}
        {resource.address && (
          <div className="flex items-start gap-2">
            <span className="text-[#2a3555] text-xs pt-0.5">Address</span>
            <span className="text-[#94a3b8] text-xs">{resource.address}</span>
          </div>
        )}
        {resource.hours && (
          <div className="flex items-center gap-2">
            <span className="text-[#2a3555] text-xs">Hours</span>
            <span className="text-[#94a3b8] text-xs">{resource.hours}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-[#2a3555] text-xs">Cost</span>
          <span className="text-[#34D399] font-medium text-xs">{resource.cost}</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#2a3555]">
        <div className="flex gap-2 flex-wrap">
          {resource.teenFocused && (
            <span className="text-xs bg-[#1e0f1a] text-[#f472b6] border border-[#f472b6]/30 px-2 py-0.5 rounded-lg">
              Teen Resources
            </span>
          )}
          {resource.lgbtqFriendly && (
            <span className="text-xs bg-[#1c2444] text-[#c4b5fd] border border-[#2a3555] px-2 py-0.5 rounded-lg">
              LGBTQ+ Friendly
            </span>
          )}
          {resource.disabilityAccessible && (
            <span className="text-xs bg-[#0f1e2e] text-[#60a5fa] border border-[#2a3555] px-2 py-0.5 rounded-lg">
              Disability Accessible
            </span>
          )}
          {resource.languages && resource.languages.length > 0 && (
            <span className="text-xs text-[#94a3b8]">
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
            className="text-xs text-[#9f7aea] hover:text-white hover:underline font-medium transition-colors duration-150"
          >
            Visit website →
          </a>
        )}
      </div>
    </div>
  );
}
