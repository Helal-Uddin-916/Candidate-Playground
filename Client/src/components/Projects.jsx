import React, { useEffect, useState } from "react";
import { getProjectsBySkill } from "../api/profileApi";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [skill, setSkill] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProjects = async (reset = false) => {
    if (!skill) return;

    setLoading(true);
    try {
      const data = await getProjectsBySkill(skill, page);
      const results = data?.results || [];
      setProjects(results);
      setHasMore(results.length > 0);
    } catch (err) {
      console.error(err);
      setProjects([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skill) fetchProjects();
  }, [page]);

  // Skeleton loader while loading
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
        <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
      </div>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Projects by Skill</h2>

      {/* Search */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter skill (React, Node, etc)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
        />
        <button
          onClick={() => {
            setPage(1);
            fetchProjects(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Loading / Skeleton */}
      {loading ? renderSkeletons() : null}

      {/* Empty */}
      {!loading && projects.length === 0 && skill && (
        <div className="text-gray-500 text-sm">
          No projects found for "{skill}"
        </div>
      )}

      {/* Projects List */}
      {!loading && projects.length > 0 && (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800">{project.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{project.description}</p>
              {project.links?.length > 0 && (
                <div className="mt-2 space-y-1">
                  {project.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-blue-600 text-sm hover:underline"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {projects.length > 0 && (
        <div className="flex justify-between items-center pt-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 rounded ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">Page {page}</span>

          <button
            disabled={!hasMore}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 rounded ${
              !hasMore
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
