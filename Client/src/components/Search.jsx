import React, { useState } from "react";
import { searchProfile } from "../api/profileApi";

export default function Search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const data = await searchProfile(query);
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Skeleton for search result
  const renderSkeleton = () => (
    <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Search Profile</h2>

      {/* Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Loading / Skeleton */}
      {loading && renderSkeleton()}

      {/* Result */}
      {!loading && result && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800">{result.name}</h3>
          <p className="text-gray-600 text-sm">Email: {result.email}</p>
        </div>
      )}

      {/* No result */}
      {!loading && !result && query && (
        <div className="text-gray-500 text-sm">No profile found</div>
      )}
    </div>
  );
}
