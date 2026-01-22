import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profileApi";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setForm(data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const updated = await updateProfile(form);
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  /* -------------------- LOADING (UNCHANGED) -------------------- */
  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded-xl shadow animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center py-20 text-red-500 text-lg">
        No profile data found.
      </div>
    );
  }

  /* -------------------- VIEW MODE -------------------- */
  if (!editing) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {profile.name}
              </h1>
              <p className="text-gray-600 mt-1">Email: {profile.email}</p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit your details
            </button>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {profile.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {profile.education?.map((edu, index) => (
              <li key={index}>
                <span className="font-medium">{edu.degree}</span> —{" "}
                {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Links</h2>
          <ul className="space-y-2 text-gray-700">
            {Object.entries(profile.links || {}).map(([key, value]) => (
              <li key={key}>
                {key}:{" "}
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  /* -------------------- EDIT MODE -------------------- */
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-semibold">Edit Profile</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          value={form.skills?.join(", ") || ""}
          onChange={(e) =>
            setForm({
              ...form,
              skills: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          placeholder="Skills (comma separated)"
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={() => setEditing(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
