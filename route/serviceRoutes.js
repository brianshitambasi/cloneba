const express = require("express");
const router = express.Router();

const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controller/serviceController");

const { auth, authorizeRoles } = require("../middleware/auth");

// =========================
// PUBLIC ROUTES
// =========================
router.get("/", getServices);
router.get("/:id", getServiceById);

// =========================
// ADMIN ONLY ROUTES
// =========================
router.post("/", auth, authorizeRoles("admin"), createService);
router.put("/:id", auth, authorizeRoles("admin"), updateService);
router.delete("/:id", auth, authorizeRoles("admin"), deleteService);

module.exports = router;