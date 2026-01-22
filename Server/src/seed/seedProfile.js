require("dotenv").config();
const mongoose = require("mongoose");
const Profile = require("../models/Profile");

const seedProfile = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Profile.deleteMany();

    await Profile.create({
      name: "Md Helal Uddin",
      email: "helaluddin6831@gmail.com",

      education: [
        {
          degree: "Master of Computer Application (M.C.A)",
          institution: "Maulana Abul Kalam Azad University of Technology",
          year: "2024 - Present",
        },
      ],

      skills: [
        "Java",
        "C",
        "C++",
        "Python",
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "REST APIs",
        "JWT",
        "Tailwind CSS",
      ],

      projects: [
        {
          title: "Candidate Profile Playground",
          description:
            "MERN playground exposing profile data via REST APIs with search and filtering.",
          links: ["https://github.com/Helal-Uddin-916"],
        },
        {
          title: "Blog App",
          description:
            "Full-stack MERN blogging platform with JWT authentication.",
          links: ["https://github.com/Helal-Uddin-916"],
        },
        {
          title: "Imagify App",
          description:
            "AI image generation MERN app using Clipdrop API.",
          links: ["https://github.com/Helal-Uddin-916"],
        },
      ],

      work: [
        {
          company: "Adtitude Digital",
          role: "Software Engineering Intern",
          duration: "Jan 2025 – Jun 2025",
        },
      ],

      links: {
        github: "https://github.com/Helal-Uddin-916",
        linkedin: "https://linkedin.com/in/md-helal-uddin",
        portfolio: "https://portfolio-zeta-roan-47.vercel.app/",
      },
    });

    console.log("✅ Profile seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedProfile();
