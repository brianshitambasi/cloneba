// models.js
const mongoose = require("mongoose");

// User Model
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Service Model
const serviceSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

// Project Model
const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    technologies: [String],
  },
  { timestamps: true }
);

// Contact Model
const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

// Job Model
const jobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: String,
  },
  { timestamps: true }
);

// Export all models
module.exports = {
  User: mongoose.model("User", userSchema),
  Service: mongoose.model("Service", serviceSchema),
  Project: mongoose.model("Project", projectSchema),
  Contact: mongoose.model("Contact", contactSchema),
  Job: mongoose.model("Job", jobSchema),
};