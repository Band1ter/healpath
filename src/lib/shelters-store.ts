import { Shelter } from "@/types/shelter";

// In-memory storage - persists during server session
let shelters: Shelter[] = [
  {
    id: "sh-001",
    name: "Safe Harbor NYC",
    slug: "safe-harbor-nyc",
    description:
      "Emergency shelter for survivors of domestic violence in Manhattan and the Bronx",
    fullDescription:
      "Safe Harbor provides confidential emergency shelter, counseling, and legal advocacy for survivors of domestic violence. Our trauma-informed staff is available 24/7 to ensure your safety and support your healing journey.",
    phone: "(212) 555-0147",
    address: "123 Hope Street, Manhattan, NY 10001",
    city: "NYC",
    website: "https://example.com/safe-harbor",
    email: "intake@safeharbor.example.com",
    capacity: 45,
    hours: "24/7",
    languages: ["English", "Spanish", "Mandarin"],
    acceptedCategories: ["dv", "both"],
    services: [
      "Emergency shelter",
      "Counseling",
      "Legal advocacy",
      "Job training",
      "Childcare support",
    ],
    lgbtqFriendly: true,
    disabilityAccessible: true,
    petsAllowed: false,
    childrenAllowed: true,
    intakeProcess:
      "Call our hotline 24/7. An advocate will assess your safety and arrange immediate shelter if needed. No appointment required.",
    requirements: "Currently experiencing domestic violence, age 18+",
    cost: "Free",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sh-002",
    name: "Haven House New Jersey",
    slug: "haven-house-nj",
    description:
      "Transitional housing and support services for domestic violence and sexual assault survivors",
    fullDescription:
      "Haven House offers transitional housing (up to 24 months) combined with intensive case management, therapy, and job readiness training. We serve survivors rebuilding their lives with dignity and independence.",
    phone: "(609) 555-0198",
    address: "456 Recovery Road, Newark, NJ 07102",
    city: "NJ",
    website: "https://example.com/haven-house",
    email: "intake@havenhouse.example.com",
    capacity: 32,
    hours: "24/7",
    languages: ["English", "Spanish", "Portuguese"],
    acceptedCategories: ["dv", "sa", "both"],
    services: [
      "Transitional housing",
      "Case management",
      "Therapy",
      "Job training",
      "GED support",
      "Benefits assistance",
    ],
    lgbtqFriendly: true,
    disabilityAccessible: true,
    petsAllowed: true,
    childrenAllowed: true,
    intakeProcess:
      "Call intake line or visit in person. We do a confidential assessment to determine eligibility. Applications reviewed within 48 hours.",
    requirements:
      "Survivors of DV or sexual assault, willingness to engage in programming, NYC/NJ resident preferred",
    cost: "Free",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sh-003",
    name: "Phoenix Rising - Brooklyn DV Services",
    slug: "phoenix-rising-brooklyn",
    description:
      "Crisis shelter and long-term housing solutions for domestic violence survivors",
    fullDescription:
      "Phoenix Rising is a community-based shelter providing emergency safe housing, peer support groups, and comprehensive case management. We believe every survivor deserves a path to independence and healing.",
    phone: "(718) 555-0182",
    address: "789 Liberty Avenue, Brooklyn, NY 11201",
    city: "NYC",
    website: "https://example.com/phoenix-rising",
    email: "help@phoenixrising.example.com",
    capacity: 28,
    hours: "24/7",
    languages: ["English", "Spanish", "Creole", "Russian"],
    acceptedCategories: ["dv"],
    services: [
      "Emergency shelter",
      "Peer support groups",
      "Case management",
      "Legal referrals",
      "Mental health counseling",
    ],
    lgbtqFriendly: false,
    disabilityAccessible: false,
    petsAllowed: false,
    childrenAllowed: true,
    intakeProcess:
      "Call our 24-hour hotline. Intake specialists will gather information and determine emergency placement.",
    requirements: "Experiencing domestic violence, age 18+",
    cost: "Free",
    createdAt: new Date().toISOString(),
  },
];

export function getShelters(): Shelter[] {
  return [...shelters].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getShelterBySlug(slug: string): Shelter | undefined {
  return shelters.find((s) => s.slug === slug);
}

export function getShelterById(id: string): Shelter | undefined {
  return shelters.find((s) => s.id === id);
}

export function addShelter(data: Omit<Shelter, "id" | "createdAt">): Shelter {
  // Check if slug already exists
  if (shelters.some((s) => s.slug === data.slug)) {
    throw new Error("Slug already exists");
  }

  const shelter: Shelter = {
    ...data,
    id: `sh-${crypto.randomUUID().substring(0, 8)}`,
    createdAt: new Date().toISOString(),
  };

  shelters.push(shelter);
  return shelter;
}

export function updateShelter(
  id: string,
  updates: Partial<Omit<Shelter, "id" | "createdAt">>
): Shelter | null {
  const index = shelters.findIndex((s) => s.id === id);
  if (index === -1) return null;

  // If slug is being updated, check uniqueness
  if (updates.slug && updates.slug !== shelters[index].slug) {
    if (shelters.some((s) => s.slug === updates.slug && s.id !== id)) {
      throw new Error("Slug already exists");
    }
  }

  shelters[index] = { ...shelters[index], ...updates };
  return shelters[index];
}

export function deleteShelter(id: string): boolean {
  const before = shelters.length;
  shelters = shelters.filter((s) => s.id !== id);
  return shelters.length < before;
}
