"use client";

import { useState, useEffect } from "react";
import { Shelter } from "@/types/shelter";
import ShelterForm from "@/components/shelters/ShelterForm";
import ShelterCard from "@/components/shelters/ShelterCard";

export default function SheltersAdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [secret, setSecret] = useState("");
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingShelter, setEditingShelter] = useState<Shelter | undefined>();

  // Load shelters on auth
  useEffect(() => {
    if (authenticated) {
      fetchShelters();
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
  };

  const fetchShelters = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/shelters");
      if (!res.ok) throw new Error("Failed to fetch shelters");
      const data = await res.json();
      setShelters(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddShelter = () => {
    setEditingShelter(undefined);
    setShowForm(true);
  };

  const handleEditShelter = (shelter: Shelter) => {
    setEditingShelter(shelter);
    setShowForm(true);
  };

  const handleDeleteShelter = async (id: string) => {
    try {
      const res = await fetch(`/api/shelters/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-secret": secret,
        },
      });

      if (!res.ok) throw new Error("Failed to delete shelter");

      setShelters((prev) => prev.filter((s) => s.id !== id));
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleFormSuccess = async (shelter: Shelter) => {
    setShowForm(false);
    setEditingShelter(undefined);
    await fetchShelters();
  };

  const handleSignOut = () => {
    setAuthenticated(false);
    setSecret("");
    setShelters([]);
    setError("");
  };

  if (!authenticated) {
    return (
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
            <h1 className="text-3xl font-heading text-warmNeutral-800 mb-2">
              Partner Shelters
            </h1>
            <p className="text-sm text-warmNeutral-600 mb-6">
              Enter your admin secret to manage shelters
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Admin secret"
                required
                className="w-full px-4 py-2 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-400 text-sm"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-lavender-600 text-white rounded-xl hover:bg-lavender-700 transition-colors font-semibold text-sm"
              >
                Enter Admin Panel
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading text-warmNeutral-800">
                Partner Shelters
              </h1>
              <p className="text-sm text-warmNeutral-600 mt-1">
                {shelters.length} shelter{shelters.length !== 1 ? "s" : ""} registered
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-warmNeutral-200 text-warmNeutral-700 rounded-xl hover:bg-warmNeutral-300 transition-colors font-semibold text-sm"
            >
              Sign Out
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Add Button */}
          <button
            onClick={handleAddShelter}
            className="mb-8 px-6 py-3 bg-lavender-600 text-white rounded-xl hover:bg-lavender-700 transition-colors font-semibold text-sm"
          >
            Add New Shelter
          </button>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block mb-4">
                <div className="w-8 h-8 border-4 border-lavender-200 border-t-lavender-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-sm text-warmNeutral-600">Loading shelters...</p>
            </div>
          )}

          {/* Shelters Grid */}
          {!loading && shelters.length > 0 && (
            <div className="grid gap-6">
              {shelters.map((shelter) => (
                <ShelterCard
                  key={shelter.id}
                  shelter={shelter}
                  onEdit={handleEditShelter}
                  onDelete={handleDeleteShelter}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && shelters.length === 0 && (
            <div className="text-center py-12 bg-warmNeutral-50 rounded-2xl border-2 border-dashed border-warmNeutral-200">
              <p className="text-sm text-warmNeutral-600 mb-4">No shelters registered yet</p>
              <button
                onClick={handleAddShelter}
                className="px-6 py-2 bg-lavender-600 text-white rounded-xl hover:bg-lavender-700 transition-colors font-semibold text-sm"
              >
                Add the First Shelter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <ShelterForm
          shelter={editingShelter}
          adminSecret={secret}
          onSuccess={handleFormSuccess}
          onClose={() => {
            setShowForm(false);
            setEditingShelter(undefined);
          }}
        />
      )}
    </main>
  );
}
