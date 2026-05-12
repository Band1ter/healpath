export type ResourceCategory = "legal" | "medical" | "hotline" | "shelter";

export type ResourceLocation = "nyc" | "nj" | "national";

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  location: ResourceLocation;
  phone?: string;
  address?: string;
  website?: string;
  hours?: string;
  cost: string;
  languages?: string[];
  lgbtqFriendly?: boolean;
  disabilityAccessible?: boolean;
}
