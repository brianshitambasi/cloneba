const mongoose = require("mongoose");

// User Model (Enhanced)
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    avatar: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

// Service Model
const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    fullDescription: { type: String, default: "" },
    icon: { type: String, default: "FaCogs" },
    color: { type: String, default: "#667eea" },
    benefits: [{ type: String }],
    features: [{ type: String }],
    technologies: [{ type: String }],
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Project Model
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    description: { type: String, required: true },
    challenge: { type: String, default: "" },
    solution: { type: String, default: "" },
    results: [{ type: String }],
    technologies: [{ type: String }],
    client: { type: String, default: "" },
    industry: { type: String, default: "" },
    location: { type: String, default: "" },
    image: { type: String, default: "" },
    testimonial: {
      quote: { type: String },
      author: { type: String },
      title: { type: String },
      company: { type: String },
    },
    metrics: {
      type: Map,
      of: String,
      default: {},
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Contact Model
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

// Job Model
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["Full-time", "Part-time", "Contract", "Remote", "Hybrid"],
      default: "Full-time" 
    },
    salary: { type: String, default: "Competitive" },
    experience: { type: String, default: "" },
    department: { type: String, default: "" },
    requirements: [{ type: String }],
    benefits: [{ type: String }],
    responsibilities: [{ type: String }],
    isActive: { type: Boolean, default: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
