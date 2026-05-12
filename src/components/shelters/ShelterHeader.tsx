"use client";

import { Shelter } from "@/types/shelter";
import Link from "next/link";

interface ShelterHeaderProps {
  shelter: Shelter;
}

const categoryLabel = {
  dv: "Domestic Violence",
  sa: "Sexual Assault",
  both: "Both DV & SA",
};

export default function ShelterHeader({ shelter }: ShelterHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-lavender-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-heading text-lavender-700 mb-4">
            {shelter.name}
          </h1>

          <p className="text-lg text-warmNeutral-600 leading-relaxed mb-6">
            {shelter.fullDescription}
          </p>

          {/* Quick Contact */}
          <div className="flex gap-4 flex-wrap">
            <a
              href={`tel:${shelter.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-lavender-600 text-white rounded-xl hover:bg-lavender-700 transition-colors font-semibold"
            >
              Call Now: {shelter.phone}
            </a>
            {shelter.website && (
              <a
                href={shelter.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sage-100 text-sage-700 rounded-xl hover:bg-sage-200 transition-colors font-semibold"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>

        {/* Location & Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-lavender-100">
          <div>
            <h3 className="text-xs font-semibold text-warmNeutral-600 uppercase mb-2">
              Location
            </h3>
            <p className="text-sm text-warmNeutral-800">
              {shelter.address}
              <br />
              {shelter.city}
            </p>
            {shelter.email && (
              <a
                href={`mailto:${shelter.email}`}
                className="text-sm text-lavender-600 hover:underline mt-2 block"
              >
                {shelter.email}
              </a>
            )}
          </div>

          <div>
            <h3 className="text-xs font-semibold text-warmNeutral-600 uppercase mb-2">
              Hours
            </h3>
            <p className="text-sm font-semibold text-warmNeutral-800">
              {shelter.hours}
            </p>
          </div>
        </div>

        {/* Who They Serve */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-warmNeutral-600 uppercase mb-3">
            Who They Serve
          </h3>
          <div className="flex flex-wrap gap-2">
            {shelter.acceptedCategories.map((cat) => (
              <span
                key={cat}
                className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {categoryLabel[cat]}
              </span>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-warmNeutral-600 uppercase mb-3">
            Services Offered
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shelter.services.map((service) => (
              <li
                key={service}
                className="flex items-center gap-3 text-sm text-warmNeutral-700"
              >
                <span className="text-lavender-600 font-semibold">✓</span>
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Languages & Accessibility */}
        <div className="mb-8 pb-8 border-b border-lavender-100">
          <h3 className="text-xs font-semibold text-warmNeutral-600 uppercase mb-3">
            Accessibility & Languages
          </h3>
          <div className="space-y-3">
            {shelter.languages.length > 0 && (
              <p className="text-sm text-warmNeutral-700">
                <span className="font-semibold">Languages:</span>{" "}
                {shelter.languages.join(", ")}
              </p>
            )}
            {(shelter.lgbtqFriendly ||
              shelter.disabilityAccessible ||
              shelter.petsAllowed ||
              shelter.childrenAllowed) && (
              <div className="flex flex-wrap gap-2">
                {shelter.lgbtqFriendly && (
                  <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                    LGBTQ+ Friendly
                  </span>
                )}
                {shelter.disabilityAccessible && (
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    Wheelchair Accessible
                  </span>
                )}
                {shelter.petsAllowed && (
                  <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                    Pets Allowed
                  </span>
                )}
                {shelter.childrenAllowed && (
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    Children Welcome
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Intake Process */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-warmNeutral-600 uppercase mb-3">
            How to Get Shelter
          </h3>
          <div className="bg-warmNeutral-50 border border-warmNeutral-200 rounded-xl p-4 text-sm text-warmNeutral-800 leading-relaxed">
            {shelter.intakeProcess}
          </div>
        </div>

        {/* Requirements */}
        {shelter.requirements && (
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-warmNeutral-600 uppercase mb-3">
              Eligibility
            </h3>
            <p className="text-sm text-warmNeutral-800">{shelter.requirements}</p>
          </div>
        )}

        {/* Cost */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-warmNeutral-600 uppercase mb-2">
            Cost
          </h3>
          <p className="text-sm font-semibold text-warmNeutral-800">
            {shelter.cost}
          </p>
        </div>

        {/* Capacity */}
        {shelter.capacity && (
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-warmNeutral-600 uppercase mb-2">
              Current Capacity
            </h3>
            <p className="text-sm text-warmNeutral-800">
              Up to {shelter.capacity} residents
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="bg-lavender-50 border border-lavender-200 rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-heading text-warmNeutral-800 mb-2">
            Need Support?
          </h2>
          <p className="text-sm text-warmNeutral-700 mb-4">
            Talk to Sage, our compassionate AI companion, about safety planning and next steps.
          </p>
          <Link
            href="/chat"
            className="inline-block px-6 py-3 bg-lavender-600 text-white rounded-xl hover:bg-lavender-700 transition-colors font-semibold text-sm"
          >
            Chat with Sage
          </Link>
        </div>
      </div>
    </div>
  );
}
