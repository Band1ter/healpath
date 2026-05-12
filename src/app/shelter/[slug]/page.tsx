import { getShelterBySlug } from "@/lib/shelters-store";
import ShelterHeader from "@/components/shelters/ShelterHeader";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const shelter = getShelterBySlug(params.slug);

  if (!shelter) {
    return {
      title: "Shelter Not Found",
    };
  }

  return {
    title: `${shelter.name} - HealPath`,
    description: shelter.description,
  };
}

export default function ShelterPage({ params }: { params: { slug: string } }) {
  const shelter = getShelterBySlug(params.slug);

  if (!shelter) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col">
      <ShelterHeader shelter={shelter} />
    </main>
  );
}
