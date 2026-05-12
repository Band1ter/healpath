"use client";

import { useState } from "react";
import { Shelter } from "@/types/shelter";
import clsx from "clsx";

interface ShelterFormProps {
  shelter?: Shelter;
  adminSecret: string;
  onSuccess: (shelter: Shelter) => void;
  onClose: () => void;
}

export default function ShelterForm({
  shelter,
  adminSecret,
  onSuccess,
  onClose,
}: ShelterFormProps) {
  const isEditing = !!shelter;

  const [formData, setFormData] = useState({
    name: shelter?.name || "",
    slug: shelter?.slug || "",
    description: shelter?.description || "",
    fullDescription: shelter?.fullDescription || "",
    phone: shelter?.phone || "",
    address: shelter?.address || "",
    city: shelter?.city || ("NYC" as const),
    website: shelter?.website || "",
    email: shelter?.email || "",
    capacity: shelter?.capacity?.toString() || "",
    hours: shelter?.hours || "",
    languages: shelter?.languages || [],
    acceptedCategories: shelter?.acceptedCategories || ["dv"],
    services: shelter?.services || [],
    lgbtqFriendly: shelter?.lgbtqFriendly || false,
    disabilityAccessible: shelter?.disabilityAccessible || false,
    petsAllowed: shelter?.petsAllowed || false,
    childrenAllowed: shelter?.childrenAllowed || false,
    intakeProcess: shelter?.intakeProcess || "",
    requirements: shelter?.requirements || "",
    cost: shelter?.cost || ("Free" as const),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addLanguage = () => {
    if (
      languageInput.trim() &&
      !formData.languages.includes(languageInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, languageInput.trim()],
      }));
      setLanguageInput("");
    }
  };

  const removeLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== lang),
    }));
  };

  const addService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()],
      }));
      setServiceInput("");
    }
  };

  const removeService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  const toggleCategory = (category: "dv" | "sa" | "both") => {
    setFormData((prev) => ({
      ...prev,
      acceptedCategories: prev.acceptedCategories.includes(category)
        ? prev.acceptedCategories.filter((c) => c !== category)
        : [...prev.acceptedCategories, category],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/shelters/${shelter.id}` : "/api/shelters";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({
          ...formData,
          capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save shelter");
      }

      const saved = await response.json();
      onSuccess(saved);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-heading font-semibold text-warmNeutral-800 mb-6">
          {isEditing ? "Edit Shelter" : "Add Shelter Partner"}
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Slug */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
                Shelter Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
                placeholder="Safe Harbor NYC"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
                URL Slug *
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
                placeholder="safe-harbor-nyc"
              />
              <p className="text-xs text-warmNeutral-500 mt-1">
                Becomes: /shelter/your-slug
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
              Short Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={2}
              className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
              placeholder="One-line summary for listings"
            />
          </div>

          {/* Full Description */}
          <div>
            <label htmlFor="fullDescription" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
              Full Description *
            </label>
            <textarea
              id="fullDescription"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
              placeholder="Detailed shelter information and mission"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
                Phone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
              />
            </div>
          </div>

          {/* Address & City */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label htmlFor="address" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
                Address *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
                City *
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
              >
                <option value="NYC">NYC</option>
                <option value="NJ">NJ</option>
              </select>
            </div>
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
              placeholder="https://..."
            />
          </div>

          {/* Operations */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="hours" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
                Hours *
              </label>
              <input
                id="hours"
                name="hours"
                type="text"
                value={formData.hours}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
                placeholder="24/7 or 9am-5pm"
              />
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
                Capacity
              </label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
                placeholder="Max residents"
              />
            </div>
          </div>

          {/* Cost */}
          <div>
            <label htmlFor="cost" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
              Cost *
            </label>
            <select
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
            >
              <option value="Free">Free</option>
              <option value="Sliding scale">Sliding scale</option>
              <option value="Variable">Variable</option>
            </select>
          </div>

          {/* Abuse Categories */}
          <div>
            <label className="block text-sm font-semibold text-warmNeutral-700 mb-3">
              Who They Serve *
            </label>
            <div className="space-y-2">
              {(["dv", "sa", "both"] as const).map((cat) => (
                <label key={cat} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 rounded border-lavender-300 text-lavender-600"
                  />
                  <span className="ml-3 text-sm text-warmNeutral-700">
                    {cat === "dv"
                      ? "Domestic Violence"
                      : cat === "sa"
                        ? "Sexual Assault"
                        : "Both"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-semibold text-warmNeutral-700 mb-2">
              Languages Spoken
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
                className="flex-1 px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
                placeholder="Type language name"
              />
              <button
                type="button"
                onClick={addLanguage}
                className="px-4 py-2 bg-lavender-100 text-lavender-700 rounded-xl hover:bg-lavender-200 transition-colors text-sm font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang)}
                    className="hover:text-sage-900 font-semibold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-semibold text-warmNeutral-700 mb-2">
              Services Offered *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
                className="flex-1 px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
                placeholder="Type service name"
              />
              <button
                type="button"
                onClick={addService}
                className="px-4 py-2 bg-lavender-100 text-lavender-700 rounded-xl hover:bg-lavender-200 transition-colors text-sm font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((service) => (
                <span
                  key={service}
                  className="bg-lavender-100 text-lavender-700 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                >
                  {service}
                  <button
                    type="button"
                    onClick={() => removeService(service)}
                    className="hover:text-lavender-900 font-semibold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <label className="block text-sm font-semibold text-warmNeutral-700 mb-3">
              Accessibility & Inclusion
            </label>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="lgbtqFriendly"
                  checked={formData.lgbtqFriendly}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-lavender-300 text-lavender-600"
                />
                <span className="ml-3 text-sm text-warmNeutral-700">LGBTQ+ Friendly</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="disabilityAccessible"
                  checked={formData.disabilityAccessible}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-lavender-300 text-lavender-600"
                />
                <span className="ml-3 text-sm text-warmNeutral-700">Wheelchair Accessible</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={formData.petsAllowed}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-lavender-300 text-lavender-600"
                />
                <span className="ml-3 text-sm text-warmNeutral-700">Pets Allowed</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="childrenAllowed"
                  checked={formData.childrenAllowed}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-lavender-300 text-lavender-600"
                />
                <span className="ml-3 text-sm text-warmNeutral-700">Children Allowed</span>
              </label>
            </div>
          </div>

          {/* Intake Process */}
          <div>
            <label htmlFor="intakeProcess" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
              Intake Process *
            </label>
            <textarea
              id="intakeProcess"
              name="intakeProcess"
              value={formData.intakeProcess}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
              placeholder="How someone applies or arrives for shelter"
            />
          </div>

          {/* Requirements */}
          <div>
            <label htmlFor="requirements" className="block text-sm font-semibold text-warmNeutral-700 mb-2">
              Requirements / Eligibility
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400"
              placeholder="Any eligibility criteria"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t border-lavender-100">
            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "flex-1 px-6 py-3 rounded-xl font-semibold transition-all",
                loading
                  ? "bg-lavender-300 text-lavender-600 cursor-not-allowed"
                  : "bg-lavender-600 text-white hover:bg-lavender-700 active:scale-95"
              )}
            >
              {loading
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                  ? "Save Changes"
                  : "Create Shelter"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-warmNeutral-100 text-warmNeutral-700 rounded-xl font-semibold hover:bg-warmNeutral-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
