const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    education: [
      {
        degree: String,
        institution: String,
        year: String
      }
    ],
    skills: [String],
    projects: [
      {
        title: String,
        description: String,
        links: [String]
      }
    ],
    work: [
      {
        company: String,
        role: String,
        duration: String
      }
    ],
    links: {
      github: String,
      linkedin: String,
      portfolio: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
