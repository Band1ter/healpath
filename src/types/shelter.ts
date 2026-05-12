export interface Shelter {
  id: string;
  name: string;
  slug: string; // URL-safe identifier (e.g., "safe-harbor-nyc")
  description: string; // Short summary for listings
  fullDescription: string; // Longer text for landing page
  phone: string;
  address: string;
  city: "NYC" | "NJ";
  website?: string;
  email?: string;

  // Intake & Operations
  capacity?: number; // Max residents
  hours: string; // e.g., "24/7" or "9am-5pm"
  languages: string[];
  acceptedCategories: ("dv" | "sa" | "both")[]; // Abuse types served

  // Services & Accessibility
  services: string[]; // e.g., ["Counseling", "Legal support", "Job training"]
  lgbtqFriendly: boolean;
  disabilityAccessible: boolean;
  petsAllowed: boolean;
  childrenAllowed: boolean;

  // Partnership Info
  intakeProcess: string; // How to apply/arrive
  requirements?: string; // Eligibility criteria
  cost: "Free" | "Sliding scale" | "Variable";

  createdAt: string; // ISO timestamp
}
