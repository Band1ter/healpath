import { NextRequest, NextResponse } from "next/server";
import {
  getShelters,
  addShelter,
} from "@/lib/shelters-store";

const VALID_CATEGORIES = ["dv", "sa", "both"];
const VALID_CITIES = ["NYC", "NJ"];
const VALID_COSTS = ["Free", "Sliding scale", "Variable"];

export async function GET(req: NextRequest) {
  try {
    const shelters = getShelters();
    return NextResponse.json(shelters);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shelters" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const authHeader = req.headers.get("x-admin-secret");
    const adminSecret = process.env.ADMIN_SECRET ?? "healpath-dev-secret";

    if (authHeader !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validation
    const {
      name,
      slug,
      description,
      fullDescription,
      phone,
      address,
      city,
      website,
      email,
      capacity,
      hours,
      languages,
      acceptedCategories,
      services,
      lgbtqFriendly,
      disabilityAccessible,
      petsAllowed,
      childrenAllowed,
      intakeProcess,
      requirements,
      cost,
    } = body;

    // Required field validation
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("name is required");
    }
    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      errors.push("slug is required");
    }
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      errors.push("slug must be lowercase letters, numbers, and hyphens only");
    }
    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      errors.push("description is required");
    }
    if (
      !fullDescription ||
      typeof fullDescription !== "string" ||
      fullDescription.trim().length === 0
    ) {
      errors.push("fullDescription is required");
    }
    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      errors.push("phone is required");
    }
    if (!address || typeof address !== "string" || address.trim().length === 0) {
      errors.push("address is required");
    }
    if (!city || !VALID_CITIES.includes(city)) {
      errors.push("city must be NYC or NJ");
    }
    if (!hours || typeof hours !== "string" || hours.trim().length === 0) {
      errors.push("hours is required");
    }
    if (
      !Array.isArray(languages) ||
      languages.some((l) => typeof l !== "string")
    ) {
      errors.push("languages must be an array of strings");
    }
    if (
      !Array.isArray(acceptedCategories) ||
      !acceptedCategories.every((c) => VALID_CATEGORIES.includes(c))
    ) {
      errors.push("acceptedCategories must contain dv, sa, or both");
    }
    if (
      !Array.isArray(services) ||
      services.some((s) => typeof s !== "string")
    ) {
      errors.push("services must be an array of strings");
    }
    if (typeof lgbtqFriendly !== "boolean") {
      errors.push("lgbtqFriendly must be a boolean");
    }
    if (typeof disabilityAccessible !== "boolean") {
      errors.push("disabilityAccessible must be a boolean");
    }
    if (typeof petsAllowed !== "boolean") {
      errors.push("petsAllowed must be a boolean");
    }
    if (typeof childrenAllowed !== "boolean") {
      errors.push("childrenAllowed must be a boolean");
    }
    if (
      !intakeProcess ||
      typeof intakeProcess !== "string" ||
      intakeProcess.trim().length === 0
    ) {
      errors.push("intakeProcess is required");
    }
    if (!cost || !VALID_COSTS.includes(cost)) {
      errors.push("cost must be Free, Sliding scale, or Variable");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    // Create shelter
    const shelter = addShelter({
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      description: description.trim(),
      fullDescription: fullDescription.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city,
      website: website?.trim(),
      email: email?.trim(),
      capacity: capacity ? parseInt(capacity) : undefined,
      hours: hours.trim(),
      languages,
      acceptedCategories,
      services,
      lgbtqFriendly,
      disabilityAccessible,
      petsAllowed,
      childrenAllowed,
      intakeProcess: intakeProcess.trim(),
      requirements: requirements?.trim(),
      cost,
    });

    return NextResponse.json(shelter, { status: 201 });
  } catch (error: unknown) {
    const message = (error as { message?: string })?.message;

    if (message === "Slug already exists") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create shelter" },
      { status: 500 }
    );
  }
}
