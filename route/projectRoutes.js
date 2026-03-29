const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controller/projectController");

const { auth, authorizeRoles } = require("../middleware/auth");

// =========================
// PUBLIC ROUTES
// =========================
router.get("/", getProjects);
router.get("/:id", getProjectById);

// =========================
// ADMIN ONLY ROUTES
// =========================
router.post("/", auth, authorizeRoles("admin"), createProject);

router.put("/:id", auth, authorizeRoles("admin"), updateProject);

router.delete("/:id", auth, authorizeRoles("admin"), deleteProject);

module.exports = router;