import { NextRequest, NextResponse } from "next/server";
import {
  getShelterById,
  updateShelter,
  deleteShelter,
} from "@/lib/shelters-store";

const VALID_CATEGORIES = ["dv", "sa", "both"];
const VALID_CITIES = ["NYC", "NJ"];
const VALID_COSTS = ["Free", "Sliding scale", "Variable"];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shelter = getShelterById(params.id);

    if (!shelter) {
      return NextResponse.json({ error: "Shelter not found" }, { status: 404 });
    }

    return NextResponse.json(shelter);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shelter" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const authHeader = req.headers.get("x-admin-secret");
    const adminSecret = process.env.ADMIN_SECRET ?? "healpath-dev-secret";

    if (authHeader !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Partial validation - only validate fields that are provided
    const errors: string[] = [];

    if (body.name !== undefined) {
      if (typeof body.name !== "string" || body.name.trim().length === 0) {
        errors.push("name must be a non-empty string");
      }
    }

    if (body.slug !== undefined) {
      if (typeof body.slug !== "string" || body.slug.trim().length === 0) {
        errors.push("slug must be a non-empty string");
      }
      if (body.slug && !/^[a-z0-9-]+$/.test(body.slug)) {
        errors.push("slug must be lowercase letters, numbers, and hyphens only");
      }
    }

    if (body.city !== undefined) {
      if (!VALID_CITIES.includes(body.city)) {
        errors.push("city must be NYC or NJ");
      }
    }

    if (body.acceptedCategories !== undefined) {
      if (
        !Array.isArray(body.acceptedCategories) ||
        !body.acceptedCategories.every((c: string) =>
          VALID_CATEGORIES.includes(c)
        )
      ) {
        errors.push("acceptedCategories must contain dv, sa, or both");
      }
    }

    if (body.languages !== undefined) {
      if (
        !Array.isArray(body.languages) ||
        body.languages.some((l: unknown) => typeof l !== "string")
      ) {
        errors.push("languages must be an array of strings");
      }
    }

    if (body.services !== undefined) {
      if (
        !Array.isArray(body.services) ||
        body.services.some((s: unknown) => typeof s !== "string")
      ) {
        errors.push("services must be an array of strings");
      }
    }

    if (body.cost !== undefined) {
      if (!VALID_COSTS.includes(body.cost)) {
        errors.push("cost must be Free, Sliding scale, or Variable");
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    // Update shelter
    const updates: Partial<any> = {};

    Object.keys(body).forEach((key) => {
      if (typeof body[key] === "string") {
        updates[key] = body[key].trim();
      } else {
        updates[key] = body[key];
      }
    });

    const shelter = updateShelter(params.id, updates);

    if (!shelter) {
      return NextResponse.json({ error: "Shelter not found" }, { status: 404 });
    }

    return NextResponse.json(shelter);
  } catch (error: unknown) {
    const message = (error as { message?: string })?.message;

    if (message === "Slug already exists") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update shelter" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const authHeader = req.headers.get("x-admin-secret");
    const adminSecret = process.env.ADMIN_SECRET ?? "healpath-dev-secret";

    if (authHeader !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deleted = deleteShelter(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Shelter not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete shelter" },
      { status: 500 }
    );
  }
}
