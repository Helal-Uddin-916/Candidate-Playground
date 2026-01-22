import api from "./axios";

export const getProfile = async () => {
  const res = await api.get("/profile"); // no full URL needed
  return res.data;
};

export const getProjectsBySkill = async (skill, page = 1) => {
  const res = await api.get("/profile/projects", {
    params: { skill, page },
  });
  return res.data;
};

export const searchProfile = async (query) => {
  const res = await api.get("/profile/search", {
    params: { q: query },
  });
  return res.data;
};

export const updateProfile = async (profile) => {
  const res = await api.put("/profile", profile);
  return res.data;
};