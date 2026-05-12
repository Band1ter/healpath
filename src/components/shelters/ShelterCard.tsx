"use client";

import { Shelter } from "@/types/shelter";

interface ShelterCardProps {
  shelter: Shelter;
  onEdit: (shelter: Shelter) => void;
  onDelete: (id: string) => void;
}

export default function ShelterCard({
  shelter,
  onEdit,
  onDelete,
}: ShelterCardProps) {
  const handleDelete = () => {
    if (confirm(`Delete "${shelter.name}"? This cannot be undone.`)) {
      onDelete(shelter.id);
    }
  };

  const categoryLabel = {
    dv: "Domestic Violence",
    sa: "Sexual Assault",
    both: "Both DV & SA",
  };

  return (
    <div className="border border-lavender-200 rounded-2xl p-5 hover:shadow-md transition-shadow bg-white">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-warmNeutral-800">
            {shelter.name}
          </h3>
          <p className="text-sm text-warmNeutral-500 mt-1">
            {shelter.city} • {shelter.address}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(shelter)}
            className="px-3 py-1 text-sm bg-lavender-100 text-lavender-700 rounded-xl hover:bg-lavender-200 transition-colors font-medium"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Phone & Hours */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-lavender-100">
        <div>
          <p className="text-xs font-semibold text-warmNeutral-600 uppercase mb-1">Phone</p>
          <a
            href={`tel:${shelter.phone}`}
            className="text-sm text-lavender-600 hover:underline font-medium"
          >
            {shelter.phone}
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold text-warmNeutral-600 uppercase mb-1">Hours</p>
          <p className="text-sm text-warmNeutral-700 font-medium">
            {shelter.hours}
          </p>
        </div>
      </div>

      {/* Services & Categories */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-warmNeutral-600 uppercase mb-2">
          Serves
        </p>
        <div className="flex flex-wrap gap-2">
          {shelter.acceptedCategories.map((cat) => (
            <span
              key={cat}
              className="bg-sage-100 text-sage-700 text-xs px-2.5 py-1 rounded-full font-medium"
            >
              {categoryLabel[cat]}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-warmNeutral-600 uppercase mb-2">
          Services
        </p>
        <div className="flex flex-wrap gap-2">
          {shelter.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="bg-lavender-50 text-lavender-700 text-xs px-2.5 py-1 rounded-full font-medium"
            >
              {service}
            </span>
          ))}
          {shelter.services.length > 3 && (
            <span className="text-xs text-warmNeutral-500 self-center">
              +{shelter.services.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Accessibility & Special Accommodations */}
      {(shelter.lgbtqFriendly ||
        shelter.disabilityAccessible ||
        shelter.petsAllowed ||
        shelter.childrenAllowed) && (
        <div className="pt-4 border-t border-lavender-100">
          <p className="text-xs font-semibold text-warmNeutral-600 uppercase mb-2">
            Accommodations
          </p>
          <div className="flex flex-wrap gap-2">
            {shelter.lgbtqFriendly && (
              <span className="text-xs bg-pink-50 text-pink-700 px-2.5 py-1 rounded-full font-medium">
                LGBTQ+ Friendly
              </span>
            )}
            {shelter.disabilityAccessible && (
              <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                Wheelchair Accessible
              </span>
            )}
            {shelter.petsAllowed && (
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                Pets Allowed
              </span>
            )}
            {shelter.childrenAllowed && (
              <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
                Children Welcome
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
