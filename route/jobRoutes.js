const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controller/jobController");

const { auth, authorizeRoles } = require("../middleware/auth");

// =========================
// PUBLIC ROUTES
// =========================
router.get("/", getJobs);
router.get("/:id", getJobById);

// =========================
// ADMIN ONLY ROUTES
// =========================
router.post("/", auth, authorizeRoles("admin"), createJob);

router.put("/:id", auth, authorizeRoles("admin"), updateJob);

router.delete("/:id", auth, authorizeRoles("admin"), deleteJob);

module.exports = router;