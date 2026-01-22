const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
  const profile = await Profile.create(req.body);
  res.status(201).json(profile);
};

exports.getProfile = async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
};

exports.updateProfile = async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
  res.json(profile);
};

exports.getProjectsBySkill = async (req, res) => {
  const { skill, page = 1, limit = 5 } = req.query;

  const profile = await Profile.findOne({ skills: skill });

  if (!profile) return res.json([]);

  const start = (page - 1) * limit;
  const end = page * limit;

  res.json({
    total: profile.projects.length,
    page: Number(page),
    results: profile.projects.slice(start, end)
  });
};


exports.search = async (req, res) => {
  const { q } = req.query;

  const profile = await Profile.findOne({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { skills: { $regex: q, $options: 'i' } },
      { 'projects.title': { $regex: q, $options: 'i' } },
      { 'projects.description': { $regex: q, $options: 'i' } },
      { 'education.degree': { $regex: q, $options: 'i' } }
    ]
  });

  res.json(profile);
};

